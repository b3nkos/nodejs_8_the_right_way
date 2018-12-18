'use strict'

const EventEmitter = require('events').EventEmitter

class LDJClient extends EventEmitter {
  constructor(stream) {
    if(!stream) {
      throw new Error("can't be a null value")
    }
    super()

    let buffer = ''
    stream.on('data', data => {
      buffer += data

      let boundary = buffer.indexOf('\n')

      while (boundary !== -1) {
        const input = buffer.substring(0, boundary)
        buffer = buffer.substring(boundary + 1)
        this.emit('message', JSON.parse(input))
        boundary = buffer.indexOf('\n')
      }
    })

    stream.on('close', () => {
      this.emit('message', JSON.parse(buffer))
    })
  }

  static connect(stream) {
    return new LDJClient(stream)
  }
}

module.exports = LDJClient
