package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewClassificationEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewDrugEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewDrugsfdaEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewEnforcementEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewEventEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewLabelEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewN510kEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewNdcEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewNsdeEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewPmaEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewProblemEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewShortageEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

var NewSubstanceEntityFunc func(client *OpenfdaSDK, entopts map[string]any) OpenfdaEntityBase

