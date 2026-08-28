# frozen_string_literal: true

# Typed models for the Openfda SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Classification entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Classification = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Classification#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
ClassificationListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Drug entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Drug = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Drug#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
DrugListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Drugsfda entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Drugsfda = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Drugsfda#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
DrugsfdaListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Enforcement entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Enforcement = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Enforcement#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
EnforcementListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Event = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Event#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
EventListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Label entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Label = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Label#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
LabelListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# N510k entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
N510k = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for N510k#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
N510kListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Ndc entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Ndc = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Ndc#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
NdcListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Nsde entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Nsde = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Nsde#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
NsdeListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Pma entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Pma = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Pma#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
PmaListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Problem entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Problem = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Problem#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
ProblemListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Shortage entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Shortage = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Shortage#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
ShortageListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

# Substance entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Substance = Struct.new(
  :meta,
  :results,
  keyword_init: true
)

# Request payload for Substance#list.
#
# @!attribute [rw] count
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] search
#   @return [String, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
SubstanceListMatch = Struct.new(
  :count,
  :limit,
  :search,
  :skip,
  keyword_init: true
)

