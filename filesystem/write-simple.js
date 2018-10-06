'use strict'
const fs = require('fs')
fs.writeFile('test.txt', 'hello world!', (err) => {
  if(err) {
    throw err
  }
  console.log('File saved!')
})
