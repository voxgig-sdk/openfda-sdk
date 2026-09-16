# Openfda PHP SDK Reference

Complete API reference for the Openfda PHP SDK.


## OpenfdaSDK

### Constructor

```php
require_once __DIR__ . '/openfda_sdk.php';

$client = new OpenfdaSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenfdaSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OpenfdaSDK::test();
```


### Instance Methods

#### `Classification($data = null)`

Create a new `ClassificationEntity` instance. Pass `null` for no initial data.

#### `Drug($data = null)`

Create a new `DrugEntity` instance. Pass `null` for no initial data.

#### `Drugsfda($data = null)`

Create a new `DrugsfdaEntity` instance. Pass `null` for no initial data.

#### `Enforcement($data = null)`

Create a new `EnforcementEntity` instance. Pass `null` for no initial data.

#### `Event($data = null)`

Create a new `EventEntity` instance. Pass `null` for no initial data.

#### `Label($data = null)`

Create a new `LabelEntity` instance. Pass `null` for no initial data.

#### `N510k($data = null)`

Create a new `N510kEntity` instance. Pass `null` for no initial data.

#### `Ndc($data = null)`

Create a new `NdcEntity` instance. Pass `null` for no initial data.

#### `Nsde($data = null)`

Create a new `NsdeEntity` instance. Pass `null` for no initial data.

#### `Pma($data = null)`

Create a new `PmaEntity` instance. Pass `null` for no initial data.

#### `Problem($data = null)`

Create a new `ProblemEntity` instance. Pass `null` for no initial data.

#### `Shortage($data = null)`

Create a new `ShortageEntity` instance. Pass `null` for no initial data.

#### `Substance($data = null)`

Create a new `SubstanceEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): OpenfdaUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ClassificationEntity

```php
$classification = $client->Classification();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Classification()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ClassificationEntity`

Create a new `ClassificationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DrugEntity

```php
$drug = $client->Drug();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Drug()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DrugEntity`

Create a new `DrugEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DrugsfdaEntity

```php
$drugsfda = $client->Drugsfda();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Drugsfda()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DrugsfdaEntity`

Create a new `DrugsfdaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EnforcementEntity

```php
$enforcement = $client->Enforcement();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Enforcement()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EnforcementEntity`

Create a new `EnforcementEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Event()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LabelEntity

```php
$label = $client->Label();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Label()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LabelEntity`

Create a new `LabelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## N510kEntity

```php
$n510k = $client->N510k();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->N510k()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): N510kEntity`

Create a new `N510kEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NdcEntity

```php
$ndc = $client->Ndc();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Ndc()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NdcEntity`

Create a new `NdcEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## NsdeEntity

```php
$nsde = $client->Nsde();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Nsde()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): NsdeEntity`

Create a new `NsdeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PmaEntity

```php
$pma = $client->Pma();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Pma()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PmaEntity`

Create a new `PmaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProblemEntity

```php
$problem = $client->Problem();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Problem()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProblemEntity`

Create a new `ProblemEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ShortageEntity

```php
$shortage = $client->Shortage();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Shortage()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ShortageEntity`

Create a new `ShortageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SubstanceEntity

```php
$substance = $client->Substance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meta` | `array` | No |  |
| `results` | `array` | No | Array of result objects matching the query |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Substance()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SubstanceEntity`

Create a new `SubstanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```php
$client = new OpenfdaSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

