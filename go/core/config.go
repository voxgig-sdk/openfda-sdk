package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Openfda",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "classification",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "drug",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:aspirin",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "drugsfda",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "enforcement",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "event",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 1,
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "patient.reaction.reactionmeddrapt.exact",
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 2,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "label",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count",
											"orig": "count",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "n510k",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "ndc",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "nsde",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "pma",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "problem",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "shortage",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "result",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "substance",
				"op": map[string]any{
					"list": map[string]any{
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
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 1,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
										map[string]any{
											"example": "patient.drug.openfda.brand_name:lipitor",
											"kind": "query",
											"name": "search",
											"orig": "search",
											"reqd": false,
											"type": "`$STRING`",
											"active": true,
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"reqd": false,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
