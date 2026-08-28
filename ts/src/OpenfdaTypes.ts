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
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Drug {
  meta?: Record<string, any>
  results?: any[]
}

export interface DrugListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number

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
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Enforcement {
  meta?: Record<string, any>
  results?: any[]
}

export interface EnforcementListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Event {
  meta?: Record<string, any>
  results?: any[]
}

export interface EventListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Label {
  meta?: Record<string, any>
  results?: any[]
}

export interface LabelListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface N510k {
  meta?: Record<string, any>
  results?: any[]
}

export interface N510kListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Ndc {
  meta?: Record<string, any>
  results?: any[]
}

export interface NdcListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Nsde {
  meta?: Record<string, any>
  results?: any[]
}

export interface NsdeListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Pma {
  meta?: Record<string, any>
  results?: any[]
}

export interface PmaListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Problem {
  meta?: Record<string, any>
  results?: any[]
}

export interface ProblemListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Shortage {
  meta?: Record<string, any>
  results?: any[]
}

export interface ShortageListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

export interface Substance {
  meta?: Record<string, any>
  results?: any[]
}

export interface SubstanceListMatch {
  count?: string
  limit?: number
  search?: string
  skip?: number
}

