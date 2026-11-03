<?php
declare(strict_types=1);

// Openfda SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class OpenfdaSDK implements \JsonSerializable
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new OpenfdaUtility();
        $this->_utility = $utility;

        $config = OpenfdaConfig::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = OpenfdaHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = OpenfdaHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!OpenfdaFeatures::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, OpenfdaFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    // The options hold the credential, so the default print and json form
    // name the client and nothing more; options_map() is the way to read
    // them back.
    public function jsonSerialize(): array
    {
        return ['name' => 'Openfda'];
    }

    public function __debugInfo(): array
    {
        return $this->jsonSerialize();
    }

    public function get_utility()
    {
        return OpenfdaUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = OpenfdaHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = strtoupper(is_string($method_val) && '' !== $method_val ? $method_val : "GET");
        $allow_method = Struct::getpath($opts, "allow.method");
        if (!OpenfdaPrepareMethod::allowed($allow_method, $method_val)) {
            return ($utility->make_error)($ctx, $ctx->make_error("spec_method_allow",
                "Method \"" . $method_val . "\" not allowed by SDK option allow.method value: \"" .
                (is_string($allow_method) ? $allow_method : "") . "\""));
        }
        $params = OpenfdaHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = OpenfdaHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new OpenfdaSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        return OpenfdaPrepareMethod::allowed(Struct::getpath($this->options, "allow.op"), $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new OpenfdaError($op . "_allow",
                "OpenfdaSDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = OpenfdaHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => ($utility->clean)($ctx, $fetch_err)];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = OpenfdaHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            $body_err = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
                if (true === Struct::getprop($fetched, "unreadable")) {
                    $failed = ($status >= 200 && $status < 300) ? null : $ctx->make_error(
                        "request_status",
                        "request: {$status}: " . (string)Struct::getprop($fetched, "statusText"));
                    $sent = $fetchdef["headers"] ?? [];
                    if (OpenfdaFetcher::usesDefault($ctx)) {
                        $sent = OpenfdaFetcher::sentHeaders($sent);
                    }
                    $body_err = OpenfdaResultBody::unreadable($ctx, $status, $headers,
                        Struct::getprop($fetched, "body"), $sent, $failed);
                }
            }

            $out = [
                "ok" => null === $body_err && $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
            if (null !== $body_err) {
                $out["err"] = ($utility->clean)($ctx, $body_err);
            }
            return $out;
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new OpenfdaError("graphql_error",
                "OpenfdaSDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_classification = null;

    // Canonical facade: $client->Classification()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->classification()
    // resolves here too.
    public function Classification($data = null)
    {
        require_once __DIR__ . '/entity/classification_entity.php';
        if ($data === null) {
            if ($this->_classification === null) {
                $this->_classification = new ClassificationEntity($this, null);
            }
            return $this->_classification;
        }
        return new ClassificationEntity($this, $data);
    }


    private $_drug = null;

    // Canonical facade: $client->Drug()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->drug()
    // resolves here too.
    public function Drug($data = null)
    {
        require_once __DIR__ . '/entity/drug_entity.php';
        if ($data === null) {
            if ($this->_drug === null) {
                $this->_drug = new DrugEntity($this, null);
            }
            return $this->_drug;
        }
        return new DrugEntity($this, $data);
    }


    private $_drugsfda = null;

    // Canonical facade: $client->Drugsfda()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->drugsfda()
    // resolves here too.
    public function Drugsfda($data = null)
    {
        require_once __DIR__ . '/entity/drugsfda_entity.php';
        if ($data === null) {
            if ($this->_drugsfda === null) {
                $this->_drugsfda = new DrugsfdaEntity($this, null);
            }
            return $this->_drugsfda;
        }
        return new DrugsfdaEntity($this, $data);
    }


    private $_enforcement = null;

    // Canonical facade: $client->Enforcement()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->enforcement()
    // resolves here too.
    public function Enforcement($data = null)
    {
        require_once __DIR__ . '/entity/enforcement_entity.php';
        if ($data === null) {
            if ($this->_enforcement === null) {
                $this->_enforcement = new EnforcementEntity($this, null);
            }
            return $this->_enforcement;
        }
        return new EnforcementEntity($this, $data);
    }


    private $_event = null;

    // Canonical facade: $client->Event()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->event()
    // resolves here too.
    public function Event($data = null)
    {
        require_once __DIR__ . '/entity/event_entity.php';
        if ($data === null) {
            if ($this->_event === null) {
                $this->_event = new EventEntity($this, null);
            }
            return $this->_event;
        }
        return new EventEntity($this, $data);
    }


    private $_label = null;

    // Canonical facade: $client->Label()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->label()
    // resolves here too.
    public function Label($data = null)
    {
        require_once __DIR__ . '/entity/label_entity.php';
        if ($data === null) {
            if ($this->_label === null) {
                $this->_label = new LabelEntity($this, null);
            }
            return $this->_label;
        }
        return new LabelEntity($this, $data);
    }


    private $_n510k = null;

    // Canonical facade: $client->N510k()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->n510k()
    // resolves here too.
    public function N510k($data = null)
    {
        require_once __DIR__ . '/entity/n510k_entity.php';
        if ($data === null) {
            if ($this->_n510k === null) {
                $this->_n510k = new N510kEntity($this, null);
            }
            return $this->_n510k;
        }
        return new N510kEntity($this, $data);
    }


    private $_ndc = null;

    // Canonical facade: $client->Ndc()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ndc()
    // resolves here too.
    public function Ndc($data = null)
    {
        require_once __DIR__ . '/entity/ndc_entity.php';
        if ($data === null) {
            if ($this->_ndc === null) {
                $this->_ndc = new NdcEntity($this, null);
            }
            return $this->_ndc;
        }
        return new NdcEntity($this, $data);
    }


    private $_nsde = null;

    // Canonical facade: $client->Nsde()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->nsde()
    // resolves here too.
    public function Nsde($data = null)
    {
        require_once __DIR__ . '/entity/nsde_entity.php';
        if ($data === null) {
            if ($this->_nsde === null) {
                $this->_nsde = new NsdeEntity($this, null);
            }
            return $this->_nsde;
        }
        return new NsdeEntity($this, $data);
    }


    private $_pma = null;

    // Canonical facade: $client->Pma()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pma()
    // resolves here too.
    public function Pma($data = null)
    {
        require_once __DIR__ . '/entity/pma_entity.php';
        if ($data === null) {
            if ($this->_pma === null) {
                $this->_pma = new PmaEntity($this, null);
            }
            return $this->_pma;
        }
        return new PmaEntity($this, $data);
    }


    private $_problem = null;

    // Canonical facade: $client->Problem()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->problem()
    // resolves here too.
    public function Problem($data = null)
    {
        require_once __DIR__ . '/entity/problem_entity.php';
        if ($data === null) {
            if ($this->_problem === null) {
                $this->_problem = new ProblemEntity($this, null);
            }
            return $this->_problem;
        }
        return new ProblemEntity($this, $data);
    }


    private $_shortage = null;

    // Canonical facade: $client->Shortage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->shortage()
    // resolves here too.
    public function Shortage($data = null)
    {
        require_once __DIR__ . '/entity/shortage_entity.php';
        if ($data === null) {
            if ($this->_shortage === null) {
                $this->_shortage = new ShortageEntity($this, null);
            }
            return $this->_shortage;
        }
        return new ShortageEntity($this, $data);
    }


    private $_substance = null;

    // Canonical facade: $client->Substance()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->substance()
    // resolves here too.
    public function Substance($data = null)
    {
        require_once __DIR__ . '/entity/substance_entity.php';
        if ($data === null) {
            if ($this->_substance === null) {
                $this->_substance = new SubstanceEntity($this, null);
            }
            return $this->_substance;
        }
        return new SubstanceEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new OpenfdaSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
