package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Openfda",
			"slug": "openfda",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.fda.gov",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"classification": map[string]any{},
				"drug": map[string]any{},
				"drugsfda": map[string]any{},
				"enforcement": map[string]any{},
				"event": map[string]any{},
				"label": map[string]any{},
				"n510k": map[string]any{},
				"ndc": map[string]any{},
				"nsde": map[string]any{},
				"pma": map[string]any{},
				"problem": map[string]any{},
				"shortage": map[string]any{},
				"substance": map[string]any{},
			},
		},
		"entity": map[string]any{
			"classification": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "classification",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/device/classification.json",
								"parts": []any{
									"device",
									"classification.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"drug": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"type": "`$ARRAY`",
					},
				},
				"name": "drug",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:aspirin",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/drug/event.json",
								"parts": []any{
									"drug",
									"event.json",
								},
								"select": map[string]any{
									"$action": "event",
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"drugsfda": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "drugsfda",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/drug/drugsfda.json",
								"parts": []any{
									"drug",
									"drugsfda.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"enforcement": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "enforcement",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/device/enforcement.json",
								"parts": []any{
									"device",
									"enforcement.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/drug/enforcement.json",
								"parts": []any{
									"drug",
									"enforcement.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/food/enforcement.json",
								"parts": []any{
									"food",
									"enforcement.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cosmetic/event.json",
								"parts": []any{
									"cosmetic",
									"event.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/device/event.json",
								"parts": []any{
									"device",
									"event.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/food/event.json",
								"parts": []any{
									"food",
									"event.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"label": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "label",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/drug/label.json",
								"parts": []any{
									"drug",
									"label.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"n510k": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "n510k",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/device/510k.json",
								"parts": []any{
									"device",
									"510k.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ndc": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "ndc",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/drug/ndc.json",
								"parts": []any{
									"drug",
									"ndc.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"nsde": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "nsde",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/other/nsde.json",
								"parts": []any{
									"other",
									"nsde.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pma": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "pma",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/device/pma.json",
								"parts": []any{
									"device",
									"pma.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"problem": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "problem",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tobacco/problem.json",
								"parts": []any{
									"tobacco",
									"problem.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"shortage": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "shortage",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/drug/shortages.json",
								"parts": []any{
									"drug",
									"shortages.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"substance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meta",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "results",
						"short": "Array of result objects matching the query",
						"type": "`$ARRAY`",
					},
				},
				"name": "substance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/other/substance.json",
								"parts": []any{
									"other",
									"substance.json",
								},
								"select": map[string]any{
									"exist": []any{
										"count",
										"limit",
										"search",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
