
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenfdaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpenfdaSDK.test()
    equal(testsdk instanceof OpenfdaSDK, true,
      'OpenfdaSDK.test() must return a client synchronously')
  })

})
