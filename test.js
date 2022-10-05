// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import a from 'assert'
import createDomainRegex from 'domain-regex'
import {toASCII as punycode} from 'punycode'

import entrypoint from './index.js'
const all = require('./all.json')
const common = require('./common.json')

const domainRegex = createDomainRegex()
const isValidDomain = (domain) => domainRegex.test(punycode(domain))



a.deepStrictEqual(entrypoint, all, 'module doesn\'t export all')



a(Array.isArray(all), 'not an array')
a(all.length > 0, 'no providers in all.json')

for (let provider of all)
	a(isValidDomain(provider), `invalid domain: ${provider}`)



a(Array.isArray(common), 'not an array')
a(common.length > 0, 'no providers in common.json')

for (let provider of common)
	a(isValidDomain(provider), `invalid domain: ${provider}`)
