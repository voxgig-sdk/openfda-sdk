# Openfda SDK utility: make_context

from projectname_sdk.core.context import OpenfdaContext


def make_context_util(ctxmap, basectx):
    return OpenfdaContext(ctxmap, basectx)
