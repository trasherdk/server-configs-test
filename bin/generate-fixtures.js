const path = require('path')
const zlib = require('zlib')
const fs = require('fs-extra')
const mime = require('mime-types')
const compressible = require('compressible')
const testSuites = require('../lib/basic-file-access.json')

const errorCb = (err) => {
  if (err) throw err
}

for (const suite of testSuites) {
  for (const request of Object.keys(suite.requests)) {
    const type = mime.contentType(request)
    let content = {
      'Content-Type': type || null,
      'Content-Encoding': compressible(type) ? 'gzip' : null
    }
    if (suite.default && suite.default.responseHeaders) {
      content = Object.assign(content, suite.default.responseHeaders)
    }
    if (suite.requests[request].responseHeaders) {
      content = Object.assign(content, suite.requests[request].responseHeaders)
    }
    fs.outputJsonSync(`fixtures/${request}`, content)
  }
}

fs.outputFile('fixtures/test.svgz', zlib.gzipSync(fs.readFileSync('fixtures/test.svgz')), errorCb)

for (const folder of ['/', '.well-known/', '.well-known/test/']) {
  fs.outputFile(`fixtures/${folder}.hidden_directory/test.html`, '', errorCb)
}

fs.outputFile('fixtures/test-pre-gzip.js.gz', zlib.gzipSync(JSON.stringify({
  'Content-Type': 'text/javascript; charset=utf-8',
  'Content-Encoding': 'gzip'
})), errorCb)
fs.outputFile('fixtures/test-pre-gzip.js.br', zlib.brotliCompressSync(JSON.stringify({
  'Content-Type': 'text/javascript; charset=utf-8',
  'Content-Encoding': 'br'
})), errorCb)

fs.copy(path.join(__dirname, 'extra'), 'fixtures', errorCb)
