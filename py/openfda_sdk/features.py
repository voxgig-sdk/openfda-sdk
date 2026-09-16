# Openfda SDK feature factory

from openfda_sdk.feature.base_feature import OpenfdaBaseFeature
from openfda_sdk.feature.ratelimit_feature import OpenfdaRatelimitFeature
from openfda_sdk.feature.retry_feature import OpenfdaRetryFeature
from openfda_sdk.feature.test_feature import OpenfdaTestFeature
from openfda_sdk.feature.timeout_feature import OpenfdaTimeoutFeature


_FEATURES = {
    "base": lambda: OpenfdaBaseFeature(),
    "ratelimit": lambda: OpenfdaRatelimitFeature(),
    "retry": lambda: OpenfdaRetryFeature(),
    "test": lambda: OpenfdaTestFeature(),
    "timeout": lambda: OpenfdaTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
