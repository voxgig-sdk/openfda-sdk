package voxgigopenfdasdk

import (
	"github.com/voxgig-sdk/openfda-sdk/core"
	"github.com/voxgig-sdk/openfda-sdk/entity"
	"github.com/voxgig-sdk/openfda-sdk/feature"
	_ "github.com/voxgig-sdk/openfda-sdk/utility"
)

// Type aliases preserve external API.
type OpenfdaSDK = core.OpenfdaSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpenfdaEntity = core.OpenfdaEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpenfdaError = core.OpenfdaError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewClassificationEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewClassificationEntity(client, entopts)
	}
	core.NewDrugEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewDrugEntity(client, entopts)
	}
	core.NewDrugsfdaEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewDrugsfdaEntity(client, entopts)
	}
	core.NewEnforcementEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewEnforcementEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewLabelEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewLabelEntity(client, entopts)
	}
	core.NewN510kEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewN510kEntity(client, entopts)
	}
	core.NewNdcEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewNdcEntity(client, entopts)
	}
	core.NewNsdeEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewNsdeEntity(client, entopts)
	}
	core.NewPmaEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewPmaEntity(client, entopts)
	}
	core.NewProblemEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewProblemEntity(client, entopts)
	}
	core.NewShortageEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewShortageEntity(client, entopts)
	}
	core.NewSubstanceEntityFunc = func(client *core.OpenfdaSDK, entopts map[string]any) core.OpenfdaEntity {
		return entity.NewSubstanceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenfdaSDK = core.NewOpenfdaSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
