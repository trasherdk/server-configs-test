import { options, prepare, test } from './abstract-test.js'
import * as http from 'k6/http'

export { options }

export function setup () {
  const data = prepare([
    {
      name: 'using Last-Modified header',
      domain: 'http://server.localhost/',
      default: {
        statusCode: 304,
        requestHeaders: {
          'If-Modified-Since': 'Last-Modified'
        },
        responseHeaders: {
          'Access-Control-Allow-Origin': null,
          'Content-Security-Policy': false,
          'Permissions-Policy': false,
          'Referrer-Policy': false,
          'Cross-Origin-Embedder-Policy': false,
          'Cross-Origin-Opener-Policy': false,
          'Cross-Origin-Resource-Policy': false,
          'X-Powered-By': null,
          'X-Frame-Options': false,
          'X-Ua-Compatible': null,
          'X-Xss-Protection': null
        }
      },
      requests: [
        'test.html',
        'test.json',
        'test.css'
      ]
    },
    {
      name: 'using Etag header',
      domain: 'http://server.localhost/',
      default: {
        statusCode: 304,
        requestHeaders: {
          'If-None-Match': 'Etag'
        },
        responseHeaders: {
          'Access-Control-Allow-Origin': null,
          'Content-Security-Policy': false,
          'Permissions-Policy': false,
          'Referrer-Policy': false,
          'Cross-Origin-Embedder-Policy': false,
          'Cross-Origin-Opener-Policy': false,
          'Cross-Origin-Resource-Policy': false,
          'X-Powered-By': null,
          'X-Frame-Options': false,
          'X-Ua-Compatible': null,
          'X-Xss-Protection': null
        }
      },
      requests: [
        'test.html',
        'test.json',
        'test.css'
      ]
    }
  ])

  for (const test of data) {
    const targetHeader = Object.keys(test.default.requestHeaders)[0]

    test.requests = test.requests.map(request => {
      const response = http.get(request.target, {
        headers: request.requestHeaders || {}
      })
      request.requestHeaders[targetHeader] = response.headers[request.requestHeaders[targetHeader]]

      return request
    })
  }

  return data
}

export default test
