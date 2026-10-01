

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


describe('EventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENFDA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENFDA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenfdaSDK.test()
    const ent = testsdk.Event()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENFDA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"meta":{"a":true,"h":"Meta","n":"meta","r":false,"t":"`$OBJECT`","key$":"meta","index$":0},"results":{"a":true,"h":"Results","n":"results","r":false,"sh":"Array of result objects matching the query","t":"`$ARRAY`","key$":"results","index$":1}},"name":"event","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /cosmetic/event.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"patient.reaction.reactionmeddrapt.exact","k":"query","n":"count","or":"count","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"patient.drug.openfda.brand_name:lipitor","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/cosmetic/event.json","q":{"exist":["count","limit","search","skip"]},"r":{},"s":[{"lit":"cosmetic"},{"lit":"event.json"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0},{"a":true,"co":{"id":"GET /device/event.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"patient.reaction.reactionmeddrapt.exact","k":"query","n":"count","or":"count","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"patient.drug.openfda.brand_name:lipitor","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/device/event.json","q":{"exist":["count","limit","search","skip"]},"r":{},"s":[{"lit":"device"},{"lit":"event.json"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":1},{"a":true,"co":{"id":"GET /food/event.json","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"patient.reaction.reactionmeddrapt.exact","k":"query","n":"count","or":"count","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":1,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":"patient.drug.openfda.brand_name:lipitor","k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/food/event.json","q":{"exist":["count","limit","search","skip"]},"r":{},"s":[{"lit":"food"},{"lit":"event.json"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":2}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"event","name__orig":"event","Name":"Event","name_":"event","name-":"event","NAME":"EVENT","index$":4}, {"active":true,"entity":"event","key$":"BasicEventFlow","kind":"basic","name":"BasicEventFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"event_ref01"}}],"index$":0}]}, 'Event', {"GET /cosmetic/event.json":{"protocol":"http","parameters":[{"name":"search","in":"query","description":"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.","required":false,"schema":{"type":"string"},"example":"patient.drug.openfda.brand_name:lipitor","x-ref":"#/components/parameters/SearchParam","index$":0},{"name":"count","in":"query","description":"Count records by specified field. Returns frequency counts for unique values.","required":false,"schema":{"type":"string"},"example":"patient.reaction.reactionmeddrapt.exact","x-ref":"#/components/parameters/CountParam","index$":1},{"name":"limit","in":"query","description":"Number of records to return. Maximum is 1000.","required":false,"schema":{"type":"integer","default":1,"minimum":1,"maximum":1000},"x-ref":"#/components/parameters/LimitParam","index$":2},{"name":"skip","in":"query","description":"Number of records to skip for pagination. Used with limit for paging through results.","required":false,"schema":{"type":"integer","default":0,"minimum":0},"x-ref":"#/components/parameters/SkipParam","index$":3}]},"GET /device/event.json":{"protocol":"http","parameters":[{"name":"search","in":"query","description":"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.","required":false,"schema":{"type":"string"},"example":"patient.drug.openfda.brand_name:lipitor","x-ref":"#/components/parameters/SearchParam","index$":0},{"name":"count","in":"query","description":"Count records by specified field. Returns frequency counts for unique values.","required":false,"schema":{"type":"string"},"example":"patient.reaction.reactionmeddrapt.exact","x-ref":"#/components/parameters/CountParam","index$":1},{"name":"limit","in":"query","description":"Number of records to return. Maximum is 1000.","required":false,"schema":{"type":"integer","default":1,"minimum":1,"maximum":1000},"x-ref":"#/components/parameters/LimitParam","index$":2},{"name":"skip","in":"query","description":"Number of records to skip for pagination. Used with limit for paging through results.","required":false,"schema":{"type":"integer","default":0,"minimum":0},"x-ref":"#/components/parameters/SkipParam","index$":3}]},"GET /food/event.json":{"protocol":"http","parameters":[{"name":"search","in":"query","description":"Search query using openFDA query syntax. Supports logical operators (AND, OR), field-specific searches, and range queries.","required":false,"schema":{"type":"string"},"example":"patient.drug.openfda.brand_name:lipitor","x-ref":"#/components/parameters/SearchParam","index$":0},{"name":"count","in":"query","description":"Count records by specified field. Returns frequency counts for unique values.","required":false,"schema":{"type":"string"},"example":"patient.reaction.reactionmeddrapt.exact","x-ref":"#/components/parameters/CountParam","index$":1},{"name":"limit","in":"query","description":"Number of records to return. Maximum is 1000.","required":false,"schema":{"type":"integer","default":1,"minimum":1,"maximum":1000},"x-ref":"#/components/parameters/LimitParam","index$":2},{"name":"skip","in":"query","description":"Number of records to skip for pagination. Used with limit for paging through results.","required":false,"schema":{"type":"integer","default":0,"minimum":0},"x-ref":"#/components/parameters/SkipParam","index$":3}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let event_ref01_data = Object.values(setup.data.existing.event)[0] as any

    // LIST
    const event_ref01_ent = client.Event()
    const event_ref01_match: any = {}

    const event_ref01_list = (await event_ref01_ent.list(event_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/event/EventTestData.json')

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
    ['event01','event02','event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENFDA_TEST_EVENT_ENTID': idmap,
    'OPENFDA_TEST_LIVE': 'FALSE',
    'OPENFDA_TEST_EXPLAIN': 'FALSE',
    'OPENFDA_APIKEY': '',
  })

  idmap = env['OPENFDA_TEST_EVENT_ENTID']

  const live = 'TRUE' === env.OPENFDA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENFDA_TEST_EVENT_ENTID']
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
  
