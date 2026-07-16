# Openfda SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import OpenfdaUtility
from core.spec import OpenfdaSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import OpenfdaBaseFeature
from features import _make_feature


class OpenfdaSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = OpenfdaUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return OpenfdaUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = OpenfdaSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def Classification(self, data=None) -> "ClassificationEntity":
        """Entity factory: client.Classification().list() / client.Classification().load({"id": ...})."""
        from entity.classification_entity import ClassificationEntity
        return ClassificationEntity(self, data)


    def Drug(self, data=None) -> "DrugEntity":
        """Entity factory: client.Drug().list() / client.Drug().load({"id": ...})."""
        from entity.drug_entity import DrugEntity
        return DrugEntity(self, data)


    def Drugsfda(self, data=None) -> "DrugsfdaEntity":
        """Entity factory: client.Drugsfda().list() / client.Drugsfda().load({"id": ...})."""
        from entity.drugsfda_entity import DrugsfdaEntity
        return DrugsfdaEntity(self, data)


    def Enforcement(self, data=None) -> "EnforcementEntity":
        """Entity factory: client.Enforcement().list() / client.Enforcement().load({"id": ...})."""
        from entity.enforcement_entity import EnforcementEntity
        return EnforcementEntity(self, data)


    def Event(self, data=None) -> "EventEntity":
        """Entity factory: client.Event().list() / client.Event().load({"id": ...})."""
        from entity.event_entity import EventEntity
        return EventEntity(self, data)


    def Label(self, data=None) -> "LabelEntity":
        """Entity factory: client.Label().list() / client.Label().load({"id": ...})."""
        from entity.label_entity import LabelEntity
        return LabelEntity(self, data)


    def N510k(self, data=None) -> "N510kEntity":
        """Entity factory: client.N510k().list() / client.N510k().load({"id": ...})."""
        from entity.n510k_entity import N510kEntity
        return N510kEntity(self, data)


    def Ndc(self, data=None) -> "NdcEntity":
        """Entity factory: client.Ndc().list() / client.Ndc().load({"id": ...})."""
        from entity.ndc_entity import NdcEntity
        return NdcEntity(self, data)


    def Nsde(self, data=None) -> "NsdeEntity":
        """Entity factory: client.Nsde().list() / client.Nsde().load({"id": ...})."""
        from entity.nsde_entity import NsdeEntity
        return NsdeEntity(self, data)


    def Pma(self, data=None) -> "PmaEntity":
        """Entity factory: client.Pma().list() / client.Pma().load({"id": ...})."""
        from entity.pma_entity import PmaEntity
        return PmaEntity(self, data)


    def Problem(self, data=None) -> "ProblemEntity":
        """Entity factory: client.Problem().list() / client.Problem().load({"id": ...})."""
        from entity.problem_entity import ProblemEntity
        return ProblemEntity(self, data)


    def Shortage(self, data=None) -> "ShortageEntity":
        """Entity factory: client.Shortage().list() / client.Shortage().load({"id": ...})."""
        from entity.shortage_entity import ShortageEntity
        return ShortageEntity(self, data)


    def Substance(self, data=None) -> "SubstanceEntity":
        """Entity factory: client.Substance().list() / client.Substance().load({"id": ...})."""
        from entity.substance_entity import SubstanceEntity
        return SubstanceEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "OpenfdaSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.classification_entity import ClassificationEntity
    from entity.drug_entity import DrugEntity
    from entity.drugsfda_entity import DrugsfdaEntity
    from entity.enforcement_entity import EnforcementEntity
    from entity.event_entity import EventEntity
    from entity.label_entity import LabelEntity
    from entity.n510k_entity import N510kEntity
    from entity.ndc_entity import NdcEntity
    from entity.nsde_entity import NsdeEntity
    from entity.pma_entity import PmaEntity
    from entity.problem_entity import ProblemEntity
    from entity.shortage_entity import ShortageEntity
    from entity.substance_entity import SubstanceEntity
