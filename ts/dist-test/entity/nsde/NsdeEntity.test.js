"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('NsdeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENFDA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENFDA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenfdaSDK.test();
        const ent = testsdk.Nsde();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENFDA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'nsde.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "meta", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "results", "req": false, "short": "Array of result objects matching the query", "type": "`$ARRAY`", "index$": 1 }], "name": "nsde", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "patient.reaction.reactionmeddrapt.exact", "kind": "query", "name": "count", "orig": "count", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 1, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": "patient.drug.openfda.brand_name:lipitor", "kind": "query", "name": "search", "orig": "search", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "example": 0, "kind": "query", "name": "skip", "orig": "skip", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /other/nsde.json", "json": "{\"operationId\":\"searchNSDE\",\"parameters\":[{\"description\":\"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.\",\"example\":\"patient.drug.openfda.brand_name:lipitor\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Count records by specified field. Returns frequency counts for unique values.\",\"example\":\"patient.reaction.reactionmeddrapt.exact\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of records to return. Maximum is 1000.\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":1000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of records to skip for pagination. Used with limit for paging through results.\",\"in\":\"query\",\"name\":\"skip\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"disclaimer\":{\"description\":\"Important disclaimer about FDA data usage\",\"type\":\"string\"},\"last_updated\":{\"description\":\"Date the data was last updated\",\"format\":\"date\",\"type\":\"string\"},\"license\":{\"description\":\"Link to data license\",\"type\":\"string\"},\"results\":{\"properties\":{\"limit\":{\"description\":\"Number of records returned\",\"type\":\"integer\"},\"skip\":{\"description\":\"Number of records skipped\",\"type\":\"integer\"},\"total\":{\"description\":\"Total number of matching records\",\"type\":\"integer\"}},\"type\":\"object\"},\"terms\":{\"description\":\"Link to API terms of service\",\"type\":\"string\"}},\"type\":\"object\"},\"results\":{\"description\":\"Array of result objects matching the query\",\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Optional API key for higher rate limits. Without a key, requests are limited to 240 per minute and 1000 per day. With a key, limits increase to 240 per minute and 120000 per day.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/other/nsde.json", "segments": [{ "lit": "other" }, { "lit": "nsde.json" }], "select": { "exist": ["count", "limit", "search", "skip"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "nsde", "name__orig": "nsde", "Name": "Nsde", "name_": "nsde", "name-": "nsde", "NAME": "NSDE", "index$": 8 }, { "active": true, "entity": "nsde", "key$": "BasicNsdeFlow", "kind": "basic", "name": "BasicNsdeFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "nsde_ref01" } }], "index$": 0 }] }, 'Nsde');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let nsde_ref01_data = Object.values(setup.data.existing.nsde)[0];
        // LIST
        const nsde_ref01_ent = client.Nsde();
        const nsde_ref01_match = {};
        const nsde_ref01_list = (await nsde_ref01_ent.list(nsde_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/nsde/NsdeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenfdaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['nsde01', 'nsde02', 'nsde03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENFDA_TEST_NSDE_ENTID': idmap,
        'OPENFDA_TEST_LIVE': 'FALSE',
        'OPENFDA_TEST_EXPLAIN': 'FALSE',
        'OPENFDA_APIKEY': '',
    });
    idmap = env['OPENFDA_TEST_NSDE_ENTID'];
    const live = 'TRUE' === env.OPENFDA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENFDA_TEST_NSDE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenfdaSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.OPENFDA_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.OPENFDA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=NsdeEntity.test.js.map