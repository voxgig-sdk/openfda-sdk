# ProjectName SDK exists test

import pytest
from openfda_sdk import OpenfdaSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OpenfdaSDK.test(None, None)
        assert testsdk is not None
