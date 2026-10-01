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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:aspirin",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "v1",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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
            "limit": "v1",
            "search": "patient.drug.openfda.brand_name:lipitor",
            "skip": "v1"
        },
        "headers": [],
        "query": [
            "search",
            "count",
            "limit",
            "skip"
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "meta": {
                "disclaimer": "x",
                "last_updated": "2026-01-01",
                "license": "x",
                "results": {
                    "limit": 1,
                    "skip": 1,
                    "total": 1
                },
                "terms": "x"
            },
            "results": [
                {}
            ]
        },
        "idField": "id"
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