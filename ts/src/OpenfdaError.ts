
import { Context } from './Context'


class OpenfdaError extends Error {

  isOpenfdaError = true

  sdk = 'Openfda'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OpenfdaError
}

