# Openfda SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenfdaFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenfdaBaseFeature.new
    when "ratelimit"
      OpenfdaRatelimitFeature.new
    when "retry"
      OpenfdaRetryFeature.new
    when "test"
      OpenfdaTestFeature.new
    when "timeout"
      OpenfdaTimeoutFeature.new
    else
      OpenfdaBaseFeature.new
    end
  end
end
