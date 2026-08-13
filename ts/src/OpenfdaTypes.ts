// Typed models for the Openfda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Classification {
  meta?: Record<string, any>
  results?: any[]
}

export interface ClassificationListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Drug {
  meta?: Record<string, any>
  results?: any[]
}

export interface DrugListMatch {
  meta?: Record<string, any>
  results?: any[]

  // Selects a custom action instead of the plain list:
  //   'event'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Drugsfda {
  meta?: Record<string, any>
  results?: any[]
}

export interface DrugsfdaListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Enforcement {
  meta?: Record<string, any>
  results?: any[]
}

export interface EnforcementListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Event {
  meta?: Record<string, any>
  results?: any[]
}

export interface EventListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Label {
  meta?: Record<string, any>
  results?: any[]
}

export interface LabelListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface N510k {
  meta?: Record<string, any>
  results?: any[]
}

export interface N510kListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Ndc {
  meta?: Record<string, any>
  results?: any[]
}

export interface NdcListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Nsde {
  meta?: Record<string, any>
  results?: any[]
}

export interface NsdeListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Pma {
  meta?: Record<string, any>
  results?: any[]
}

export interface PmaListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Problem {
  meta?: Record<string, any>
  results?: any[]
}

export interface ProblemListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Shortage {
  meta?: Record<string, any>
  results?: any[]
}

export interface ShortageListMatch {
  meta?: Record<string, any>
  results?: any[]
}

export interface Substance {
  meta?: Record<string, any>
  results?: any[]
}

export interface SubstanceListMatch {
  meta?: Record<string, any>
  results?: any[]
}

