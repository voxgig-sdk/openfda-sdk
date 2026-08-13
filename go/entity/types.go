// Typed models for the Openfda SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/openfda-sdk/go/core"
)

// Classification is the typed data model for the classification entity.
type Classification struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// ClassificationListMatch is the typed request payload for Classification.ListTyped.
type ClassificationListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Drug is the typed data model for the drug entity.
type Drug struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// DrugListMatch is the typed request payload for Drug.ListTyped.
type DrugListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Drugsfda is the typed data model for the drugsfda entity.
type Drugsfda struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// DrugsfdaListMatch is the typed request payload for Drugsfda.ListTyped.
type DrugsfdaListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Enforcement is the typed data model for the enforcement entity.
type Enforcement struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// EnforcementListMatch is the typed request payload for Enforcement.ListTyped.
type EnforcementListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Label is the typed data model for the label entity.
type Label struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// LabelListMatch is the typed request payload for Label.ListTyped.
type LabelListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// N510k is the typed data model for the n510k entity.
type N510k struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// N510kListMatch is the typed request payload for N510k.ListTyped.
type N510kListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Ndc is the typed data model for the ndc entity.
type Ndc struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// NdcListMatch is the typed request payload for Ndc.ListTyped.
type NdcListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Nsde is the typed data model for the nsde entity.
type Nsde struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// NsdeListMatch is the typed request payload for Nsde.ListTyped.
type NsdeListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Pma is the typed data model for the pma entity.
type Pma struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// PmaListMatch is the typed request payload for Pma.ListTyped.
type PmaListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Problem is the typed data model for the problem entity.
type Problem struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// ProblemListMatch is the typed request payload for Problem.ListTyped.
type ProblemListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Shortage is the typed data model for the shortage entity.
type Shortage struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// ShortageListMatch is the typed request payload for Shortage.ListTyped.
type ShortageListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Substance is the typed data model for the substance entity.
type Substance struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// SubstanceListMatch is the typed request payload for Substance.ListTyped.
type SubstanceListMatch struct {
	Meta *map[string]any `json:"meta,omitempty"`
	Results *[]any `json:"results,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
