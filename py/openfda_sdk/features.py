# Openfda SDK feature factory

from openfda_sdk.feature.base_feature import OpenfdaBaseFeature
from openfda_sdk.feature.test_feature import OpenfdaTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OpenfdaBaseFeature(),
        "test": lambda: OpenfdaTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
