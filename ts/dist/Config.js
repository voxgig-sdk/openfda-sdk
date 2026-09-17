"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Openfda',
        slug: "openfda",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.fda.gov",
        auth: {
            prefix: '',
            in: 'query',
            name: 'api_key',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            classification: {},
            drug: {},
            drugsfda: {},
            enforcement: {},
            event: {},
            label: {},
            n510k: {},
            ndc: {},
            nsde: {},
            pma: {},
            problem: {},
            shortage: {},
            substance: {},
        }
    };
    entity = {
        "classification": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "classification",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/device/classification.json",
                            "segments": [
                                {
                                    "lit": "device"
                                },
                                {
                                    "lit": "classification.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "device",
                                "classification.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "drug": {
            "fields": [],
            "name": "drug",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:aspirin",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/drug/event.json",
                            "segments": [
                                {
                                    "lit": "drug"
                                },
                                {
                                    "lit": "event.json"
                                }
                            ],
                            "select": {
                                "$action": "event",
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "drug",
                                "event.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "drugsfda": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "drugsfda",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/drug/drugsfda.json",
                            "segments": [
                                {
                                    "lit": "drug"
                                },
                                {
                                    "lit": "drugsfda.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "drug",
                                "drugsfda.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "enforcement": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "enforcement",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/device/enforcement.json",
                            "segments": [
                                {
                                    "lit": "device"
                                },
                                {
                                    "lit": "enforcement.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "device",
                                "enforcement.json"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/drug/enforcement.json",
                            "segments": [
                                {
                                    "lit": "drug"
                                },
                                {
                                    "lit": "enforcement.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "drug",
                                "enforcement.json"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/food/enforcement.json",
                            "segments": [
                                {
                                    "lit": "food"
                                },
                                {
                                    "lit": "enforcement.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "food",
                                "enforcement.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "event": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "event",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cosmetic/event.json",
                            "segments": [
                                {
                                    "lit": "cosmetic"
                                },
                                {
                                    "lit": "event.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "cosmetic",
                                "event.json"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/device/event.json",
                            "segments": [
                                {
                                    "lit": "device"
                                },
                                {
                                    "lit": "event.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "device",
                                "event.json"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/food/event.json",
                            "segments": [
                                {
                                    "lit": "food"
                                },
                                {
                                    "lit": "event.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "food",
                                "event.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "label": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "label",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/drug/label.json",
                            "segments": [
                                {
                                    "lit": "drug"
                                },
                                {
                                    "lit": "label.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "drug",
                                "label.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "n510k": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "n510k",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/device/510k.json",
                            "segments": [
                                {
                                    "lit": "device"
                                },
                                {
                                    "lit": "510k.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "device",
                                "510k.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "ndc": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "ndc",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/drug/ndc.json",
                            "segments": [
                                {
                                    "lit": "drug"
                                },
                                {
                                    "lit": "ndc.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "drug",
                                "ndc.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "nsde": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "nsde",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/other/nsde.json",
                            "segments": [
                                {
                                    "lit": "other"
                                },
                                {
                                    "lit": "nsde.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "other",
                                "nsde.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "pma": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "pma",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/device/pma.json",
                            "segments": [
                                {
                                    "lit": "device"
                                },
                                {
                                    "lit": "pma.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "device",
                                "pma.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "problem": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "problem",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tobacco/problem.json",
                            "segments": [
                                {
                                    "lit": "tobacco"
                                },
                                {
                                    "lit": "problem.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "tobacco",
                                "problem.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "shortage": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "shortage",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/drug/shortages.json",
                            "segments": [
                                {
                                    "lit": "drug"
                                },
                                {
                                    "lit": "shortages.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "drug",
                                "shortages.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "substance": {
            "fields": [
                {
                    "name": "meta",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "results",
                    "short": "Array of result objects matching the query",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "substance",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "patient.reaction.reactionmeddrapt.exact",
                                        "kind": "query",
                                        "name": "count",
                                        "orig": "count",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 1,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "patient.drug.openfda.brand_name:lipitor",
                                        "kind": "query",
                                        "name": "search",
                                        "orig": "search",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": 0,
                                        "kind": "query",
                                        "name": "skip",
                                        "orig": "skip",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/other/substance.json",
                            "segments": [
                                {
                                    "lit": "other"
                                },
                                {
                                    "lit": "substance.json"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "count",
                                    "limit",
                                    "search",
                                    "skip"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "other",
                                "substance.json"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map