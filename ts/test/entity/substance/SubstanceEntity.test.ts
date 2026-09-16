

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


describe('SubstanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENFDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENFDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenfdaSDK.test()
    const ent = testsdk.Substance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENFDA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'substance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"meta","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"results","req":false,"short":"Array of result objects matching the query","type":"`$ARRAY`","index$":1}],"name":"substance","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"patient.reaction.reactionmeddrapt.exact","kind":"query","name":"count","orig":"count","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":1,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"example":"patient.drug.openfda.brand_name:lipitor","kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":0,"kind":"query","name":"skip","orig":"skip","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /other/substance.json","json":"{\"operationId\":\"searchSubstance\",\"parameters\":[{\"description\":\"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.\",\"example\":\"patient.drug.openfda.brand_name:lipitor\",\"in\":\"query\",\"name\":\"search\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Count records by specified field. Returns frequency counts for unique values.\",\"example\":\"patient.reaction.reactionmeddrapt.exact\",\"in\":\"query\",\"name\":\"count\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of records to return. Maximum is 1000.\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":1,\"maximum\":1000,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Number of records to skip for pagination. Used with limit for paging through results.\",\"in\":\"query\",\"name\":\"skip\",\"required\":false,\"schema\":{\"default\":0,\"minimum\":0,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meta\":{\"properties\":{\"disclaimer\":{\"description\":\"Important disclaimer about FDA data usage\",\"type\":\"string\"},\"last_updated\":{\"description\":\"Date the data was last updated\",\"format\":\"date\",\"type\":\"string\"},\"license\":{\"description\":\"Link to data license\",\"type\":\"string\"},\"results\":{\"properties\":{\"limit\":{\"description\":\"Number of records returned\",\"type\":\"integer\"},\"skip\":{\"description\":\"Number of records skipped\",\"type\":\"integer\"},\"total\":{\"description\":\"Total number of matching records\",\"type\":\"integer\"}},\"type\":\"object\"},\"terms\":{\"description\":\"Link to API terms of service\",\"type\":\"string\"}},\"type\":\"object\"},\"results\":{\"description\":\"Array of result objects matching the query\",\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{},{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"Optional API key for higher rate limits. Without a key, requests are limited to 240 per minute and 1000 per day. With a key, limits increase to 240 per minute and 120000 per day.\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/other/substance.json","segments":[{"lit":"other"},{"lit":"substance.json"}],"select":{"exist":["count","limit","search","skip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"substance","name__orig":"substance","Name":"Substance","name_":"substance","name-":"substance","NAME":"SUBSTANCE","index$":12}, {"active":true,"entity":"substance","key$":"BasicSubstanceFlow","kind":"basic","name":"BasicSubstanceFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"substance_ref01"}}],"index$":0}]}, 'Substance')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let substance_ref01_data = Object.values(setup.data.existing.substance)[0] as any

    // LIST
    const substance_ref01_ent = client.Substance()
    const substance_ref01_match: any = {}

    const substance_ref01_list = (await substance_ref01_ent.list(substance_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/substance/SubstanceTestData.json')

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
    ['substance01','substance02','substance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENFDA_TEST_SUBSTANCE_ENTID': idmap,
    'OPENFDA_TEST_LIVE': 'FALSE',
    'OPENFDA_TEST_EXPLAIN': 'FALSE',
    'OPENFDA_APIKEY': '',
  })

  idmap = env['OPENFDA_TEST_SUBSTANCE_ENTID']

  const live = 'TRUE' === env.OPENFDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENFDA_TEST_SUBSTANCE_ENTID']
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
  
