# Openfda SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpenfdaUtility.registrar = ->(u) {
  u.clean = OpenfdaUtilities::Clean
  u.done = OpenfdaUtilities::Done
  u.make_error = OpenfdaUtilities::MakeError
  u.feature_add = OpenfdaUtilities::FeatureAdd
  u.feature_hook = OpenfdaUtilities::FeatureHook
  u.feature_init = OpenfdaUtilities::FeatureInit
  u.fetcher = OpenfdaUtilities::Fetcher
  u.make_fetch_def = OpenfdaUtilities::MakeFetchDef
  u.make_context = OpenfdaUtilities::MakeContext
  u.make_options = OpenfdaUtilities::MakeOptions
  u.make_request = OpenfdaUtilities::MakeRequest
  u.make_response = OpenfdaUtilities::MakeResponse
  u.make_result = OpenfdaUtilities::MakeResult
  u.make_point = OpenfdaUtilities::MakePoint
  u.make_spec = OpenfdaUtilities::MakeSpec
  u.make_url = OpenfdaUtilities::MakeUrl
  u.param = OpenfdaUtilities::Param
  u.prepare_auth = OpenfdaUtilities::PrepareAuth
  u.prepare_body = OpenfdaUtilities::PrepareBody
  u.prepare_headers = OpenfdaUtilities::PrepareHeaders
  u.prepare_method = OpenfdaUtilities::PrepareMethod
  u.prepare_params = OpenfdaUtilities::PrepareParams
  u.prepare_path = OpenfdaUtilities::PreparePath
  u.prepare_query = OpenfdaUtilities::PrepareQuery
  u.result_basic = OpenfdaUtilities::ResultBasic
  u.result_body = OpenfdaUtilities::ResultBody
  u.result_headers = OpenfdaUtilities::ResultHeaders
  u.transform_request = OpenfdaUtilities::TransformRequest
  u.transform_response = OpenfdaUtilities::TransformResponse
}
