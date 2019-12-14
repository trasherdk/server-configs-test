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
    'is protocol HTTP/2': (r) => r.proto === 'h2' || r.proto === 'HTTP/2.0',
  }))
}
