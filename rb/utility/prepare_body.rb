# Openfda SDK utility: prepare_body
require_relative 'media'
module OpenfdaUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return OpenfdaUtilities.raw_body(ctx.reqdata) if OpenfdaUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
