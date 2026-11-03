"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "classification",
        "accessor": "Classification",
        "op": "list",
        "method": "GET",
        "path": "/device/classification.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "drug",
        "accessor": "Drug",
        "op": "list",
        "method": "GET",
        "path": "/drug/event.json",
        "action": "event",
        "args": [],
        "select": {
            "count": "v1",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:aspirin",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "drugsfda",
        "accessor": "Drugsfda",
        "op": "list",
        "method": "GET",
        "path": "/drug/drugsfda.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "label",
        "accessor": "Label",
        "op": "list",
        "method": "GET",
        "path": "/drug/label.json",
        "args": [],
        "select": {
            "count": "v1",
            "limit": 1,
            "search": "v1",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "n510k",
        "accessor": "N510k",
        "op": "list",
        "method": "GET",
        "path": "/device/510k.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "ndc",
        "accessor": "Ndc",
        "op": "list",
        "method": "GET",
        "path": "/drug/ndc.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "nsde",
        "accessor": "Nsde",
        "op": "list",
        "method": "GET",
        "path": "/other/nsde.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "pma",
        "accessor": "Pma",
        "op": "list",
        "method": "GET",
        "path": "/device/pma.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "problem",
        "accessor": "Problem",
        "op": "list",
        "method": "GET",
        "path": "/tobacco/problem.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "shortage",
        "accessor": "Shortage",
        "op": "list",
        "method": "GET",
        "path": "/drug/shortages.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    },
    {
        "entity": "substance",
        "accessor": "Substance",
        "op": "list",
        "method": "GET",
        "path": "/other/substance.json",
        "args": [],
        "select": {
            "count": "patient.reaction.reactionmeddrapt.exact",
            "limit": 1,
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": 0
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "queryArgs": [
            {
                "name": "count",
                "wire": "count"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "skip",
                "wire": "skip"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "terms": "x",
                "license": "x",
                "last_updated": "2026-01-01",
                "results": {
                    "skip": 1,
                    "limit": 1,
                    "total": 1
                }
            },
            "results": [
                {}
            ]
        },
        "idField": "id",
        "ownQuery": "api_key"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map