'use strict'

const a = require('assert')
const domainRegex = require('domain-regex')()
const punycode = require('punycode').toASCII

const providers = require('.')

const isValidDomain = (domain) => domainRegex.test(punycode(domain))



a(Array.isArray(providers), 'not an array')
a(providers.length > 0, 'no providers')

for (let provider of providers)
	a(isValidDomain(provider), `invalid domain: ${provider}`)
