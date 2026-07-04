// Typed models for the Openfda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Classification is the typed data model for the classification entity.
type Classification struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// ClassificationListMatch mirrors the classification fields as an all-optional match
// filter (Go analog of Partial<Classification>).
type ClassificationListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Drug is the typed data model for the drug entity.
type Drug struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// DrugListMatch mirrors the drug fields as an all-optional match
// filter (Go analog of Partial<Drug>).
type DrugListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Drugsfda is the typed data model for the drugsfda entity.
type Drugsfda struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// DrugsfdaListMatch mirrors the drugsfda fields as an all-optional match
// filter (Go analog of Partial<Drugsfda>).
type DrugsfdaListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Enforcement is the typed data model for the enforcement entity.
type Enforcement struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// EnforcementListMatch mirrors the enforcement fields as an all-optional match
// filter (Go analog of Partial<Enforcement>).
type EnforcementListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// EventListMatch mirrors the event fields as an all-optional match
// filter (Go analog of Partial<Event>).
type EventListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Label is the typed data model for the label entity.
type Label struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// LabelListMatch mirrors the label fields as an all-optional match
// filter (Go analog of Partial<Label>).
type LabelListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// N510k is the typed data model for the n510k entity.
type N510k struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// N510kListMatch mirrors the n510k fields as an all-optional match
// filter (Go analog of Partial<N510k>).
type N510kListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Ndc is the typed data model for the ndc entity.
type Ndc struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// NdcListMatch mirrors the ndc fields as an all-optional match
// filter (Go analog of Partial<Ndc>).
type NdcListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Nsde is the typed data model for the nsde entity.
type Nsde struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// NsdeListMatch mirrors the nsde fields as an all-optional match
// filter (Go analog of Partial<Nsde>).
type NsdeListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Pma is the typed data model for the pma entity.
type Pma struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// PmaListMatch mirrors the pma fields as an all-optional match
// filter (Go analog of Partial<Pma>).
type PmaListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Problem is the typed data model for the problem entity.
type Problem struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// ProblemListMatch mirrors the problem fields as an all-optional match
// filter (Go analog of Partial<Problem>).
type ProblemListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Shortage is the typed data model for the shortage entity.
type Shortage struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// ShortageListMatch mirrors the shortage fields as an all-optional match
// filter (Go analog of Partial<Shortage>).
type ShortageListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Substance is the typed data model for the substance entity.
type Substance struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// SubstanceListMatch mirrors the substance fields as an all-optional match
// filter (Go analog of Partial<Substance>).
type SubstanceListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
