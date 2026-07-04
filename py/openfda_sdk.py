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

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
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


    @property
    def classification(self):
        """Idiomatic facade: client.classification.list() / client.classification.load({"id": ...})."""
        from entity.classification_entity import ClassificationEntity
        cached = getattr(self, "_classification", None)
        if cached is None:
            cached = ClassificationEntity(self, None)
            self._classification = cached
        return cached

    def Classification(self, data=None):
        # Deprecated: use client.classification instead.
        from entity.classification_entity import ClassificationEntity
        return ClassificationEntity(self, data)


    @property
    def drug(self):
        """Idiomatic facade: client.drug.list() / client.drug.load({"id": ...})."""
        from entity.drug_entity import DrugEntity
        cached = getattr(self, "_drug", None)
        if cached is None:
            cached = DrugEntity(self, None)
            self._drug = cached
        return cached

    def Drug(self, data=None):
        # Deprecated: use client.drug instead.
        from entity.drug_entity import DrugEntity
        return DrugEntity(self, data)


    @property
    def drugsfda(self):
        """Idiomatic facade: client.drugsfda.list() / client.drugsfda.load({"id": ...})."""
        from entity.drugsfda_entity import DrugsfdaEntity
        cached = getattr(self, "_drugsfda", None)
        if cached is None:
            cached = DrugsfdaEntity(self, None)
            self._drugsfda = cached
        return cached

    def Drugsfda(self, data=None):
        # Deprecated: use client.drugsfda instead.
        from entity.drugsfda_entity import DrugsfdaEntity
        return DrugsfdaEntity(self, data)


    @property
    def enforcement(self):
        """Idiomatic facade: client.enforcement.list() / client.enforcement.load({"id": ...})."""
        from entity.enforcement_entity import EnforcementEntity
        cached = getattr(self, "_enforcement", None)
        if cached is None:
            cached = EnforcementEntity(self, None)
            self._enforcement = cached
        return cached

    def Enforcement(self, data=None):
        # Deprecated: use client.enforcement instead.
        from entity.enforcement_entity import EnforcementEntity
        return EnforcementEntity(self, data)


    @property
    def event(self):
        """Idiomatic facade: client.event.list() / client.event.load({"id": ...})."""
        from entity.event_entity import EventEntity
        cached = getattr(self, "_event", None)
        if cached is None:
            cached = EventEntity(self, None)
            self._event = cached
        return cached

    def Event(self, data=None):
        # Deprecated: use client.event instead.
        from entity.event_entity import EventEntity
        return EventEntity(self, data)


    @property
    def label(self):
        """Idiomatic facade: client.label.list() / client.label.load({"id": ...})."""
        from entity.label_entity import LabelEntity
        cached = getattr(self, "_label", None)
        if cached is None:
            cached = LabelEntity(self, None)
            self._label = cached
        return cached

    def Label(self, data=None):
        # Deprecated: use client.label instead.
        from entity.label_entity import LabelEntity
        return LabelEntity(self, data)


    @property
    def n510k(self):
        """Idiomatic facade: client.n510k.list() / client.n510k.load({"id": ...})."""
        from entity.n510k_entity import N510kEntity
        cached = getattr(self, "_n510k", None)
        if cached is None:
            cached = N510kEntity(self, None)
            self._n510k = cached
        return cached

    def N510k(self, data=None):
        # Deprecated: use client.n510k instead.
        from entity.n510k_entity import N510kEntity
        return N510kEntity(self, data)


    @property
    def ndc(self):
        """Idiomatic facade: client.ndc.list() / client.ndc.load({"id": ...})."""
        from entity.ndc_entity import NdcEntity
        cached = getattr(self, "_ndc", None)
        if cached is None:
            cached = NdcEntity(self, None)
            self._ndc = cached
        return cached

    def Ndc(self, data=None):
        # Deprecated: use client.ndc instead.
        from entity.ndc_entity import NdcEntity
        return NdcEntity(self, data)


    @property
    def nsde(self):
        """Idiomatic facade: client.nsde.list() / client.nsde.load({"id": ...})."""
        from entity.nsde_entity import NsdeEntity
        cached = getattr(self, "_nsde", None)
        if cached is None:
            cached = NsdeEntity(self, None)
            self._nsde = cached
        return cached

    def Nsde(self, data=None):
        # Deprecated: use client.nsde instead.
        from entity.nsde_entity import NsdeEntity
        return NsdeEntity(self, data)


    @property
    def pma(self):
        """Idiomatic facade: client.pma.list() / client.pma.load({"id": ...})."""
        from entity.pma_entity import PmaEntity
        cached = getattr(self, "_pma", None)
        if cached is None:
            cached = PmaEntity(self, None)
            self._pma = cached
        return cached

    def Pma(self, data=None):
        # Deprecated: use client.pma instead.
        from entity.pma_entity import PmaEntity
        return PmaEntity(self, data)


    @property
    def problem(self):
        """Idiomatic facade: client.problem.list() / client.problem.load({"id": ...})."""
        from entity.problem_entity import ProblemEntity
        cached = getattr(self, "_problem", None)
        if cached is None:
            cached = ProblemEntity(self, None)
            self._problem = cached
        return cached

    def Problem(self, data=None):
        # Deprecated: use client.problem instead.
        from entity.problem_entity import ProblemEntity
        return ProblemEntity(self, data)


    @property
    def shortage(self):
        """Idiomatic facade: client.shortage.list() / client.shortage.load({"id": ...})."""
        from entity.shortage_entity import ShortageEntity
        cached = getattr(self, "_shortage", None)
        if cached is None:
            cached = ShortageEntity(self, None)
            self._shortage = cached
        return cached

    def Shortage(self, data=None):
        # Deprecated: use client.shortage instead.
        from entity.shortage_entity import ShortageEntity
        return ShortageEntity(self, data)


    @property
    def substance(self):
        """Idiomatic facade: client.substance.list() / client.substance.load({"id": ...})."""
        from entity.substance_entity import SubstanceEntity
        cached = getattr(self, "_substance", None)
        if cached is None:
            cached = SubstanceEntity(self, None)
            self._substance = cached
        return cached

    def Substance(self, data=None):
        # Deprecated: use client.substance instead.
        from entity.substance_entity import SubstanceEntity
        return SubstanceEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
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
