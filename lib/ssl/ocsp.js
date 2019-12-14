import * as http from 'k6/http'
import { options, prepare, assert } from '../abstract-test.js'

export { options }

export function setup () {
  return prepare([
    {
      name: 'ssl features',
      requests: ['https://secure.server.localhost/']
    }
  ])
}

export default function (data) {
  assert(data, '', () => ({
    'is OCSP response good': (r) => r.ocsp.status === http.OCSP_STATUS_GOOD,
  }))
}
