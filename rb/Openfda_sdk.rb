# Openfda SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Openfda_types'


class OpenfdaSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = OpenfdaUtility.new
    @_utility = utility

    config = OpenfdaConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = OpenfdaHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = OpenfdaHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, OpenfdaFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    OpenfdaUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = OpenfdaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = OpenfdaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = OpenfdaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = OpenfdaSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue OpenfdaError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = OpenfdaHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = OpenfdaHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.classification.list / client.classification.load({ "id" => ... })
  def classification
    require_relative 'entity/classification_entity'
    @classification ||= ClassificationEntity.new(self, nil)
  end

  # Deprecated: use client.classification instead.
  def Classification(data = nil)
    require_relative 'entity/classification_entity'
    ClassificationEntity.new(self, data)
  end


  # Idiomatic facade: client.drug.list / client.drug.load({ "id" => ... })
  def drug
    require_relative 'entity/drug_entity'
    @drug ||= DrugEntity.new(self, nil)
  end

  # Deprecated: use client.drug instead.
  def Drug(data = nil)
    require_relative 'entity/drug_entity'
    DrugEntity.new(self, data)
  end


  # Idiomatic facade: client.drugsfda.list / client.drugsfda.load({ "id" => ... })
  def drugsfda
    require_relative 'entity/drugsfda_entity'
    @drugsfda ||= DrugsfdaEntity.new(self, nil)
  end

  # Deprecated: use client.drugsfda instead.
  def Drugsfda(data = nil)
    require_relative 'entity/drugsfda_entity'
    DrugsfdaEntity.new(self, data)
  end


  # Idiomatic facade: client.enforcement.list / client.enforcement.load({ "id" => ... })
  def enforcement
    require_relative 'entity/enforcement_entity'
    @enforcement ||= EnforcementEntity.new(self, nil)
  end

  # Deprecated: use client.enforcement instead.
  def Enforcement(data = nil)
    require_relative 'entity/enforcement_entity'
    EnforcementEntity.new(self, data)
  end


  # Idiomatic facade: client.event.list / client.event.load({ "id" => ... })
  def event
    require_relative 'entity/event_entity'
    @event ||= EventEntity.new(self, nil)
  end

  # Deprecated: use client.event instead.
  def Event(data = nil)
    require_relative 'entity/event_entity'
    EventEntity.new(self, data)
  end


  # Idiomatic facade: client.label.list / client.label.load({ "id" => ... })
  def label
    require_relative 'entity/label_entity'
    @label ||= LabelEntity.new(self, nil)
  end

  # Deprecated: use client.label instead.
  def Label(data = nil)
    require_relative 'entity/label_entity'
    LabelEntity.new(self, data)
  end


  # Idiomatic facade: client.n510k.list / client.n510k.load({ "id" => ... })
  def n510k
    require_relative 'entity/n510k_entity'
    @n510k ||= N510kEntity.new(self, nil)
  end

  # Deprecated: use client.n510k instead.
  def N510k(data = nil)
    require_relative 'entity/n510k_entity'
    N510kEntity.new(self, data)
  end


  # Idiomatic facade: client.ndc.list / client.ndc.load({ "id" => ... })
  def ndc
    require_relative 'entity/ndc_entity'
    @ndc ||= NdcEntity.new(self, nil)
  end

  # Deprecated: use client.ndc instead.
  def Ndc(data = nil)
    require_relative 'entity/ndc_entity'
    NdcEntity.new(self, data)
  end


  # Idiomatic facade: client.nsde.list / client.nsde.load({ "id" => ... })
  def nsde
    require_relative 'entity/nsde_entity'
    @nsde ||= NsdeEntity.new(self, nil)
  end

  # Deprecated: use client.nsde instead.
  def Nsde(data = nil)
    require_relative 'entity/nsde_entity'
    NsdeEntity.new(self, data)
  end


  # Idiomatic facade: client.pma.list / client.pma.load({ "id" => ... })
  def pma
    require_relative 'entity/pma_entity'
    @pma ||= PmaEntity.new(self, nil)
  end

  # Deprecated: use client.pma instead.
  def Pma(data = nil)
    require_relative 'entity/pma_entity'
    PmaEntity.new(self, data)
  end


  # Idiomatic facade: client.problem.list / client.problem.load({ "id" => ... })
  def problem
    require_relative 'entity/problem_entity'
    @problem ||= ProblemEntity.new(self, nil)
  end

  # Deprecated: use client.problem instead.
  def Problem(data = nil)
    require_relative 'entity/problem_entity'
    ProblemEntity.new(self, data)
  end


  # Idiomatic facade: client.shortage.list / client.shortage.load({ "id" => ... })
  def shortage
    require_relative 'entity/shortage_entity'
    @shortage ||= ShortageEntity.new(self, nil)
  end

  # Deprecated: use client.shortage instead.
  def Shortage(data = nil)
    require_relative 'entity/shortage_entity'
    ShortageEntity.new(self, data)
  end


  # Idiomatic facade: client.substance.list / client.substance.load({ "id" => ... })
  def substance
    require_relative 'entity/substance_entity'
    @substance ||= SubstanceEntity.new(self, nil)
  end

  # Deprecated: use client.substance instead.
  def Substance(data = nil)
    require_relative 'entity/substance_entity'
    SubstanceEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = OpenfdaSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
