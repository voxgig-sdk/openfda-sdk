// Openfda Ts SDK

import { ClassificationEntity } from './entity/ClassificationEntity'
import { DrugEntity } from './entity/DrugEntity'
import { DrugsfdaEntity } from './entity/DrugsfdaEntity'
import { EnforcementEntity } from './entity/EnforcementEntity'
import { EventEntity } from './entity/EventEntity'
import { LabelEntity } from './entity/LabelEntity'
import { N510kEntity } from './entity/N510kEntity'
import { NdcEntity } from './entity/NdcEntity'
import { NsdeEntity } from './entity/NsdeEntity'
import { PmaEntity } from './entity/PmaEntity'
import { ProblemEntity } from './entity/ProblemEntity'
import { ShortageEntity } from './entity/ShortageEntity'
import { SubstanceEntity } from './entity/SubstanceEntity'

export type * from './OpenfdaTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { OpenfdaEntityBase } from './OpenfdaEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class OpenfdaSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _classification?: ClassificationEntity

  // Idiomatic facade: `client.classification.list()` / `client.classification.load({ id })`.
  get classification(): ClassificationEntity {
    return (this._classification ??= new ClassificationEntity(this, undefined))
  }

  /** @deprecated Use `client.classification` instead. */
  Classification(data?: any) {
    const self = this
    return new ClassificationEntity(self,data)
  }


  _drug?: DrugEntity

  // Idiomatic facade: `client.drug.list()` / `client.drug.load({ id })`.
  get drug(): DrugEntity {
    return (this._drug ??= new DrugEntity(this, undefined))
  }

  /** @deprecated Use `client.drug` instead. */
  Drug(data?: any) {
    const self = this
    return new DrugEntity(self,data)
  }


  _drugsfda?: DrugsfdaEntity

  // Idiomatic facade: `client.drugsfda.list()` / `client.drugsfda.load({ id })`.
  get drugsfda(): DrugsfdaEntity {
    return (this._drugsfda ??= new DrugsfdaEntity(this, undefined))
  }

  /** @deprecated Use `client.drugsfda` instead. */
  Drugsfda(data?: any) {
    const self = this
    return new DrugsfdaEntity(self,data)
  }


  _enforcement?: EnforcementEntity

  // Idiomatic facade: `client.enforcement.list()` / `client.enforcement.load({ id })`.
  get enforcement(): EnforcementEntity {
    return (this._enforcement ??= new EnforcementEntity(this, undefined))
  }

  /** @deprecated Use `client.enforcement` instead. */
  Enforcement(data?: any) {
    const self = this
    return new EnforcementEntity(self,data)
  }


  _event?: EventEntity

  // Idiomatic facade: `client.event.list()` / `client.event.load({ id })`.
  get event(): EventEntity {
    return (this._event ??= new EventEntity(this, undefined))
  }

  /** @deprecated Use `client.event` instead. */
  Event(data?: any) {
    const self = this
    return new EventEntity(self,data)
  }


  _label?: LabelEntity

  // Idiomatic facade: `client.label.list()` / `client.label.load({ id })`.
  get label(): LabelEntity {
    return (this._label ??= new LabelEntity(this, undefined))
  }

  /** @deprecated Use `client.label` instead. */
  Label(data?: any) {
    const self = this
    return new LabelEntity(self,data)
  }


  _n510k?: N510kEntity

  // Idiomatic facade: `client.n510k.list()` / `client.n510k.load({ id })`.
  get n510k(): N510kEntity {
    return (this._n510k ??= new N510kEntity(this, undefined))
  }

  /** @deprecated Use `client.n510k` instead. */
  N510k(data?: any) {
    const self = this
    return new N510kEntity(self,data)
  }


  _ndc?: NdcEntity

  // Idiomatic facade: `client.ndc.list()` / `client.ndc.load({ id })`.
  get ndc(): NdcEntity {
    return (this._ndc ??= new NdcEntity(this, undefined))
  }

  /** @deprecated Use `client.ndc` instead. */
  Ndc(data?: any) {
    const self = this
    return new NdcEntity(self,data)
  }


  _nsde?: NsdeEntity

  // Idiomatic facade: `client.nsde.list()` / `client.nsde.load({ id })`.
  get nsde(): NsdeEntity {
    return (this._nsde ??= new NsdeEntity(this, undefined))
  }

  /** @deprecated Use `client.nsde` instead. */
  Nsde(data?: any) {
    const self = this
    return new NsdeEntity(self,data)
  }


  _pma?: PmaEntity

  // Idiomatic facade: `client.pma.list()` / `client.pma.load({ id })`.
  get pma(): PmaEntity {
    return (this._pma ??= new PmaEntity(this, undefined))
  }

  /** @deprecated Use `client.pma` instead. */
  Pma(data?: any) {
    const self = this
    return new PmaEntity(self,data)
  }


  _problem?: ProblemEntity

  // Idiomatic facade: `client.problem.list()` / `client.problem.load({ id })`.
  get problem(): ProblemEntity {
    return (this._problem ??= new ProblemEntity(this, undefined))
  }

  /** @deprecated Use `client.problem` instead. */
  Problem(data?: any) {
    const self = this
    return new ProblemEntity(self,data)
  }


  _shortage?: ShortageEntity

  // Idiomatic facade: `client.shortage.list()` / `client.shortage.load({ id })`.
  get shortage(): ShortageEntity {
    return (this._shortage ??= new ShortageEntity(this, undefined))
  }

  /** @deprecated Use `client.shortage` instead. */
  Shortage(data?: any) {
    const self = this
    return new ShortageEntity(self,data)
  }


  _substance?: SubstanceEntity

  // Idiomatic facade: `client.substance.list()` / `client.substance.load({ id })`.
  get substance(): SubstanceEntity {
    return (this._substance ??= new SubstanceEntity(this, undefined))
  }

  /** @deprecated Use `client.substance` instead. */
  Substance(data?: any) {
    const self = this
    return new SubstanceEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new OpenfdaSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return OpenfdaSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Openfda' }
  }

  toString() {
    return 'Openfda ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = OpenfdaSDK


export {
  stdutil,

  BaseFeature,
  OpenfdaEntityBase,

  OpenfdaSDK,
  SDK,
}


