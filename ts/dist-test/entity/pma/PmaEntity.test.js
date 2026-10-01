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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PmaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENFDA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENFDA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenfdaSDK.test();
        const ent = testsdk.Pma();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENFDA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pma.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "meta": { "a": true, "h": "Meta", "n": "meta", "r": false, "t": "`$OBJECT`", "key$": "meta", "index$": 0 }, "results": { "a": true, "h": "Results", "n": "results", "r": false, "sh": "Array of result objects matching the query", "t": "`$ARRAY`", "key$": "results", "index$": 1 } }, "name": "pma", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /device/pma.json", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "patient.reaction.reactionmeddrapt.exact", "k": "query", "n": "count", "or": "count", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "patient.drug.openfda.brand_name:lipitor", "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 0, "k": "query", "n": "skip", "or": "skip", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/device/pma.json", "q": { "exist": ["count", "limit", "search", "skip"] }, "r": {}, "s": [{ "lit": "device" }, { "lit": "pma.json" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "pma", "name__orig": "pma", "Name": "Pma", "name_": "pma", "name-": "pma", "NAME": "PMA", "index$": 9 }, { "active": true, "entity": "pma", "key$": "BasicPmaFlow", "kind": "basic", "name": "BasicPmaFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "pma_ref01" } }], "index$": 0 }] }, 'Pma', { "GET /device/pma.json": { "protocol": "http", "parameters": [{ "name": "search", "in": "query", "description": "Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.", "required": false, "schema": { "type": "string" }, "example": "patient.drug.openfda.brand_name:lipitor", "x-ref": "#/components/parameters/SearchParam", "index$": 0 }, { "name": "count", "in": "query", "description": "Count records by specified field. Returns frequency counts for unique values.", "required": false, "schema": { "type": "string" }, "example": "patient.reaction.reactionmeddrapt.exact", "x-ref": "#/components/parameters/CountParam", "index$": 1 }, { "name": "limit", "in": "query", "description": "Number of records to return. Maximum is 1000.", "required": false, "schema": { "type": "integer", "default": 1, "minimum": 1, "maximum": 1000 }, "x-ref": "#/components/parameters/LimitParam", "index$": 2 }, { "name": "skip", "in": "query", "description": "Number of records to skip for pagination. Used with limit for paging through results.", "required": false, "schema": { "type": "integer", "default": 0, "minimum": 0 }, "x-ref": "#/components/parameters/SkipParam", "index$": 3 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pma_ref01_data = Object.values(setup.data.existing.pma)[0];
        // LIST
        const pma_ref01_ent = client.Pma();
        const pma_ref01_match = {};
        const pma_ref01_list = (await pma_ref01_ent.list(pma_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pma/PmaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenfdaSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pma01', 'pma02', 'pma03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENFDA_TEST_PMA_ENTID': idmap,
        'OPENFDA_TEST_LIVE': 'FALSE',
        'OPENFDA_TEST_EXPLAIN': 'FALSE',
        'OPENFDA_APIKEY': '',
    });
    idmap = env['OPENFDA_TEST_PMA_ENTID'];
    const live = 'TRUE' === env.OPENFDA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENFDA_TEST_PMA_ENTID'];
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
//# sourceMappingURL=PmaEntity.test.js.map