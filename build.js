'use strict'

const _fetch = require('node-fetch')
const uniq = require('lodash.uniq')
const pump = require('pump')
const csvParser = require('csv-parser')
const {Writable} = require('stream')
const {promisify} = require('util')
const {writeFile} = require('fs')

const USER_AGENT = 'https://github.com/derhuerst/email-providers build script'
const PROVIDERS_URL = 'https://raw.githubusercontent.com/derhuerst/emailproviders/master/generate/domains.txt'
const TOP_DOMAINS_URL = 'https://downloads.majestic.com/majestic_million.csv'

const fetch = (url) => {
	return _fetch(url, {
		redirect: 'follow',
		headers: {'user-agent': USER_AGENT}
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res
	})
}

const fetchProviders = () => {
	return fetch(PROVIDERS_URL)
	.then(res => res.text())
	.then((data) => {
		data = data.split('\n')
		.map((d) => d.trim())
		.filter((d) => d.length > 0)
		return uniq(data).sort()
	})
}

const fetchDomains = () => {
	return fetch(TOP_DOMAINS_URL)
	.then(res => new Promise((resolve, reject) => {
		const domains = new Map()
		const onRow = (row, _, cb) => {
			domains.set(row.Domain, parseInt(row.GlobalRank))
			cb()
		}
		const onRows = (rows, _, cb) => {
			for (let i = 0; i < rows.length; i++) {
				domains.set(rows[i].Domain, parseInt(rows[i].GlobalRank))
			}
			cb()
		}

		return pump(
			res.body,
			csvParser(),
			new Writable({objectMode: true, write: onRow, writev: onRows}),
			(err) => {
				if (err) reject(err)
				else resolve(domains)
			}
		)
	}))
}

const parseDecimalWithComma = decimal => parseInt(decimal.replace(/,/g, ''), 10)

;(async () => {
	const [all, domains] = await Promise.all([fetchProviders(), fetchDomains()])

	console.info(`Fetched list of providers. all.json will contain ${all.length}.`)
	await promisify(writeFile)('all.json', JSON.stringify(all))

	const common = all
	.filter(provider => domains.has(provider))
	.map(provider => [provider, domains.get(provider)])
	.sort((a, b) => a[1] - b[1]) // by rank, ascending
	.map(([provider]) => provider)

	console.info(`common.json will contain the ${common.length} most common.`)
	await promisify(writeFile)('common.json', JSON.stringify(common))
})
()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
