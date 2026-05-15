package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewClassificationEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewDrugEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewDrugsfdaEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewEnforcementEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewEventEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewLabelEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewN510kEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewNdcEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewNsdeEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewPmaEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewProblemEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewShortageEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

var NewSubstanceEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntity

