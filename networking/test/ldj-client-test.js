'use strict'

const assert = require('assert')
const EventEmitter = require('events').EventEmitter
const LDJClient = require('../lib/ldj-client')

describe('LDJClient', () => {
  let stream = null
  let client = null

  beforeEach(() => {
    stream = new EventEmitter()
    client = LDJClient.connect(stream)
  })

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'})
      done()
    })

    stream.emmit('data', '{"foo": "bar"}\n')
  })
})
