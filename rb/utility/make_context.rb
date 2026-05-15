# Openfda SDK utility: make_context
require_relative '../core/context'
module OpenfdaUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenfdaContext.new(ctxmap, basectx)
  }
end
