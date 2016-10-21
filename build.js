'use strict'

const fetch = require('node-fetch')
const uniq = require('lodash.uniq')
const fs = require('fs')

fetch('https://raw.githubusercontent.com/derhuerst/emailproviders/master/generate/domains.txt')
.then((res) => res.text())
.then((data) => {
	const providers = uniq(
		data.split('\n')
		.map((d) => d.trim())
		.filter((d) => d.length > 0)
	).sort()
	console.info(`Fetched ${providers.length} providers.`)
	return new Promise((yay, nay) =>
		fs.writeFile('email-providers.json', JSON.stringify(providers), (err) => {
			if (err) nay(err)
			else yay()
		}))
})
.catch((err) => {
	console.error(err.message)
	process.exit(1)
})
