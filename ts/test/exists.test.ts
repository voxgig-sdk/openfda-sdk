
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenfdaSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpenfdaSDK.test()
    equal(null !== testsdk, true)
  })

})
