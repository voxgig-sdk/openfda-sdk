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
# @!attribute [rw] result
#   @return [Array, nil]
Classification = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Classification#list (any subset of Classification fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
ClassificationListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Drug entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Drug = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Drug#list (any subset of Drug fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
DrugListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Drugsfda entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Drugsfda = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Drugsfda#list (any subset of Drugsfda fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
DrugsfdaListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Enforcement entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Enforcement = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Enforcement#list (any subset of Enforcement fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
EnforcementListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Event = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Event#list (any subset of Event fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
EventListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Label entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Label = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Label#list (any subset of Label fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
LabelListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# N510k entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
N510k = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for N510k#list (any subset of N510k fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
N510kListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Ndc entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Ndc = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Ndc#list (any subset of Ndc fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
NdcListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Nsde entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Nsde = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Nsde#list (any subset of Nsde fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
NsdeListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Pma entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Pma = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Pma#list (any subset of Pma fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
PmaListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Problem entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Problem = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Problem#list (any subset of Problem fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
ProblemListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Shortage entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Shortage = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Shortage#list (any subset of Shortage fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
ShortageListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Substance entity data model.
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Substance = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

# Match filter for Substance#list (any subset of Substance fields).
#
# @!attribute [rw] meta
#   @return [Hash, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
SubstanceListMatch = Struct.new(
  :meta,
  :result,
  keyword_init: true
)

