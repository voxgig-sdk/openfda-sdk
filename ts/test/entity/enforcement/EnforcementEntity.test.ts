

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenfdaSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('EnforcementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENFDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENFDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenfdaSDK.test()
    const ent = testsdk.Enforcement()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENFDA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'enforcement.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"meta":{"a":true,"h":"Meta","n":"meta","r":false,"t":"`$OBJECT`","key$":"meta","index$":0},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"Array of result objects matching the query","t":"`$ARRAY`","key$":"results","index$":1}},"name":"enforcement","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /device/enforcement.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"patient.reaction.reactionmeddrapt.exact","k":"query","n":"count","or":"count","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"patient.drug.openfda.brand_name:lipitor","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/device/enforcement.json","q":{"exist":["count","limit","search","skip"]},"r":{},"s":[{"lit":"device"},{"lit":"enforcement.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /drug/enforcement.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"patient.reaction.reactionmeddrapt.exact","k":"query","n":"count","or":"count","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"patient.drug.openfda.brand_name:lipitor","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/drug/enforcement.json","q":{"exist":["count","limit","search","skip"]},"r":{},"s":[{"lit":"drug"},{"lit":"enforcement.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /food/enforcement.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"patient.reaction.reactionmeddrapt.exact","k":"query","n":"count","or":"count","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"patient.drug.openfda.brand_name:lipitor","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/food/enforcement.json","q":{"exist":["count","limit","search","skip"]},"r":{},"s":[{"lit":"food"},{"lit":"enforcement.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"enforcement","name__orig":"enforcement","Name":"Enforcement","name_":"enforcement","name-":"enforcement","NAME":"ENFORCEMENT","index$":3}, {"active":true,"entity":"enforcement","key$":"BasicEnforcementFlow","kind":"basic","name":"BasicEnforcementFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"enforcement_ref01"}}],"index$":0}]}, 'Enforcement', {"GET /device/enforcement.json":{"protocol":"http","operationId":"searchDeviceEnforcement","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"key$":"meta","properties":{"disclaimer":{"description":"Important disclaimer about FDA data usage","type":"string"},"last_updated":{"description":"Date the data was last updated","format":"date","type":"string"},"license":{"description":"Link to data license","type":"string"},"results":{"properties":{"limit":{"description":"Number of records returned","type":"integer"},"skip":{"description":"Number of records skipped","type":"integer"},"total":{"description":"Total number of matching records","type":"integer"}},"type":"object"},"terms":{"description":"Link to API terms of service","type":"string"}},"type":"object"},"results":{"description":"Array of result objects matching the query","items":{"additionalProperties":true,"type":"object"},"key$":"results","type":"array"}},"x-ref":"#/components/schemas/APIResponse","index$":0}}}}},"parameters":[{"name":"search","in":"query","description":"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.","required":false,"schema":{"type":"string"},"example":"patient.drug.openfda.brand_name:lipitor","x-ref":"#/components/parameters/SearchParam","index$":0},{"name":"count","in":"query","description":"Count records by specified field. Returns frequency counts for unique values.","required":false,"schema":{"type":"string"},"example":"patient.reaction.reactionmeddrapt.exact","x-ref":"#/components/parameters/CountParam","index$":1},{"name":"limit","in":"query","description":"Number of records to return. Maximum is 1000.","required":false,"schema":{"type":"integer","default":1,"minimum":1,"maximum":1000},"x-ref":"#/components/parameters/LimitParam","index$":2},{"name":"skip","in":"query","description":"Number of records to skip for pagination. Used with limit for paging through results.","required":false,"schema":{"type":"integer","default":0,"minimum":0},"x-ref":"#/components/parameters/SkipParam","index$":3}],"security":[{},{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"api_key","description":"Optional API key for higher rate limits. Without a key, requests are limited to 240 per minute and 1000 per day. With a key, limits increase to 240 per minute and 120000 per day."}}},"GET /drug/enforcement.json":{"protocol":"http","operationId":"searchDrugEnforcement","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"key$":"meta","properties":{"disclaimer":{"description":"Important disclaimer about FDA data usage","type":"string"},"last_updated":{"description":"Date the data was last updated","format":"date","type":"string"},"license":{"description":"Link to data license","type":"string"},"results":{"properties":{"limit":{"description":"Number of records returned","type":"integer"},"skip":{"description":"Number of records skipped","type":"integer"},"total":{"description":"Total number of matching records","type":"integer"}},"type":"object"},"terms":{"description":"Link to API terms of service","type":"string"}},"type":"object"},"results":{"description":"Array of result objects matching the query","items":{"additionalProperties":true,"type":"object"},"key$":"results","type":"array"}},"x-ref":"#/components/schemas/APIResponse","index$":0}}}},"400":{"description":"Bad request"}},"parameters":[{"name":"search","in":"query","description":"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.","required":false,"schema":{"type":"string"},"example":"patient.drug.openfda.brand_name:lipitor","x-ref":"#/components/parameters/SearchParam","index$":0},{"name":"count","in":"query","description":"Count records by specified field. Returns frequency counts for unique values.","required":false,"schema":{"type":"string"},"example":"patient.reaction.reactionmeddrapt.exact","x-ref":"#/components/parameters/CountParam","index$":1},{"name":"limit","in":"query","description":"Number of records to return. Maximum is 1000.","required":false,"schema":{"type":"integer","default":1,"minimum":1,"maximum":1000},"x-ref":"#/components/parameters/LimitParam","index$":2},{"name":"skip","in":"query","description":"Number of records to skip for pagination. Used with limit for paging through results.","required":false,"schema":{"type":"integer","default":0,"minimum":0},"x-ref":"#/components/parameters/SkipParam","index$":3}],"security":[{},{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"api_key","description":"Optional API key for higher rate limits. Without a key, requests are limited to 240 per minute and 1000 per day. With a key, limits increase to 240 per minute and 120000 per day."}}},"GET /food/enforcement.json":{"protocol":"http","operationId":"searchFoodEnforcement","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"meta":{"key$":"meta","properties":{"disclaimer":{"description":"Important disclaimer about FDA data usage","type":"string"},"last_updated":{"description":"Date the data was last updated","format":"date","type":"string"},"license":{"description":"Link to data license","type":"string"},"results":{"properties":{"limit":{"description":"Number of records returned","type":"integer"},"skip":{"description":"Number of records skipped","type":"integer"},"total":{"description":"Total number of matching records","type":"integer"}},"type":"object"},"terms":{"description":"Link to API terms of service","type":"string"}},"type":"object"},"results":{"description":"Array of result objects matching the query","items":{"additionalProperties":true,"type":"object"},"key$":"results","type":"array"}},"x-ref":"#/components/schemas/APIResponse","index$":0}}}}},"parameters":[{"name":"search","in":"query","description":"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.","required":false,"schema":{"type":"string"},"example":"patient.drug.openfda.brand_name:lipitor","x-ref":"#/components/parameters/SearchParam","index$":0},{"name":"count","in":"query","description":"Count records by specified field. Returns frequency counts for unique values.","required":false,"schema":{"type":"string"},"example":"patient.reaction.reactionmeddrapt.exact","x-ref":"#/components/parameters/CountParam","index$":1},{"name":"limit","in":"query","description":"Number of records to return. Maximum is 1000.","required":false,"schema":{"type":"integer","default":1,"minimum":1,"maximum":1000},"x-ref":"#/components/parameters/LimitParam","index$":2},{"name":"skip","in":"query","description":"Number of records to skip for pagination. Used with limit for paging through results.","required":false,"schema":{"type":"integer","default":0,"minimum":0},"x-ref":"#/components/parameters/SkipParam","index$":3}],"security":[{},{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"query","name":"api_key","description":"Optional API key for higher rate limits. Without a key, requests are limited to 240 per minute and 1000 per day. With a key, limits increase to 240 per minute and 120000 per day."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let enforcement_ref01_data = Object.values(setup.data.existing.enforcement)[0] as any

    // LIST
    const enforcement_ref01_ent = client.Enforcement()
    const enforcement_ref01_match: any = {}

    const enforcement_ref01_list = (await enforcement_ref01_ent.list(enforcement_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/enforcement/EnforcementTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenfdaSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['enforcement01','enforcement02','enforcement03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENFDA_TEST_ENFORCEMENT_ENTID': idmap,
    'OPENFDA_TEST_LIVE': 'FALSE',
    'OPENFDA_TEST_EXPLAIN': 'FALSE',
    'OPENFDA_APIKEY': '',
  })

  idmap = env['OPENFDA_TEST_ENFORCEMENT_ENTID']

  const live = 'TRUE' === env.OPENFDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENFDA_TEST_ENFORCEMENT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenfdaSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
