const fs = require('fs')
const data = fs.readFileSync('test.txt')
process.stdout.write(data.toString())
