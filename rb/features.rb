# Openfda SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenfdaFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenfdaBaseFeature.new
    when "test"
      OpenfdaTestFeature.new
    else
      OpenfdaBaseFeature.new
    end
  end
end
