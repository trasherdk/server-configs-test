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
    'is Strict-Transport-Security header correct': (r) => (r.headers['Strict-Transport-Security'] || '').startsWith('max-age=16070400; includeSubDomains')
  }))
}
