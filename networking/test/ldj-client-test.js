'use strict';

const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client');

describe('LDJClient', () => {
  let stream = null;
  let client = null;

  beforeEach(() => {
    stream = new EventEmitter();
    client = LDJClient.connect(stream);
  });

  it('should emit a message event from a single data event', done => {
    client.on('message', message => {
      assert.deepEqual(message, {'foo': 'bar'});
      done();
    });

    stream.emit('data', '{"foo": "bar"}\n');
  });

  it('should emit a message event from split data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar"}\n'));
  });

  it('should emit a message event from a message that is split over two data events', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    stream.emit('data', '{"foo":');
    process.nextTick(() => stream.emit('data', '"bar"'));
    process.nextTick(() => stream.emit('data', '}\n'));
  });

  it('should thrown a error when LDJClient constructor parameter is a null value', done => {
    try {
      LDJClient.connect(null);
    } catch (error) {
      assert.equal(error.message, "can't be a null value");
      done();
    }
  });

  it('should emit a data event that is not JSON', done => {
    client.on('message', message => {
      done();
    });
    stream.emit('data', 'hello');
  });

  it('should emit a data event that send JSON but no newline', done => {
    client.on('message', message => {
      assert.deepEqual(message, {foo: 'bar'});
      done();
    });

    stream.emit('data', '{"foo": "bar"}');
    stream.emit('close');
  });
});
