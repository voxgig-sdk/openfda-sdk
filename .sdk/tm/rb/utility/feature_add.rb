# Openfda SDK utility: feature_add
module OpenfdaUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
