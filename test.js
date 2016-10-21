'use strict'

const a = require('assert')
const domainRegex = require('domain-regex')()
const punycode = require('punycode').toASCII

const all = require('./all.json')
const common = require('./common.json')

const isValidDomain = (domain) => domainRegex.test(punycode(domain))



a.deepStrictEqual(require('.'), all, 'module doesn\'t export all')



a(Array.isArray(all), 'not an array')
a(all.length > 0, 'no providers in all.json')

for (let provider of all)
	a(isValidDomain(provider), `invalid domain: ${provider}`)



a(Array.isArray(common), 'not an array')
a(common.length > 0, 'no providers in common.json')

for (let provider of common)
	a(isValidDomain(provider), `invalid domain: ${provider}`)
