

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('DrugEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENFDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENFDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenfdaSDK.test()
    const ent = testsdk.Drug()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENFDA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'drug.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"drug","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"count","orig":"count","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":1,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":"patient.drug.openfda.brand_name:aspirin","kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":0,"kind":"query","name":"skip","orig":"skip","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /drug/event.json","json":"{\"operationId\":\"searchDrugEvents\",\"parameters\":[{\"description\":\"Search query using openFDA query syntax\",\"example\":\"patient.drug.openfda.brand_name:aspirin\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Count records by specified field\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of records to return (max 1000)\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":1000,\"type\":\"integer\"}},{\"description\":\"Number of records to skip for pagination\",\"in\":\"query\",\"name\":\"skip\",\"required\":false,\"schema\":{\"default\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"disclaimer\":{\"type\":\"string\"},\"license\":{\"type\":\"string\"},\"results\":{\"properties\":{\"limit\":{\"type\":\"integer\"},\"skip\":{\"type\":\"integer\"},\"total\":{\"type\":\"integer\"}},\"type\":\"object\"},\"terms\":{\"type\":\"string\"}},\"type\":\"object\"},\"results\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"description\":\"Bad request - invalid query parameters\"},\"404\":{\"description\":\"No results found\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"security\":[{},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Optional API key for higher rate limits. Without a key, requests are limited to 240 per minute and 1000 per day. With a key, limits increase to 240 per minute and 120000 per day.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/drug/event.json","segments":[{"lit":"drug"},{"lit":"event.json"}],"select":{"$action":"event","exist":["count","limit","search","skip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"drug","name__orig":"drug","Name":"Drug","name_":"drug","name-":"drug","NAME":"DRUG","index$":1}, {"active":true,"entity":"drug","key$":"BasicDrugFlow","kind":"basic","name":"BasicDrugFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"drug_ref01"}}],"index$":0}]}, 'Drug')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let drug_ref01_data = Object.values(setup.data.existing.drug)[0] as any

    // LIST
    const drug_ref01_ent = client.Drug()
    const drug_ref01_match: any = {}

    const drug_ref01_list = (await drug_ref01_ent.list(drug_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/drug/DrugTestData.json')

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
    ['drug01','drug02','drug03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENFDA_TEST_DRUG_ENTID': idmap,
    'OPENFDA_TEST_LIVE': 'FALSE',
    'OPENFDA_TEST_EXPLAIN': 'FALSE',
    'OPENFDA_APIKEY': '',
  })

  idmap = env['OPENFDA_TEST_DRUG_ENTID']

  const live = 'TRUE' === env.OPENFDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENFDA_TEST_DRUG_ENTID']
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
  
