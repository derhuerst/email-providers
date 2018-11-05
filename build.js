'use strict'

const fetch = require('node-fetch')
const uniq = require('lodash.uniq')
const queue = require('queue')
const fetchStats = require('alexa-stats')
const fs = require('fs')

const parseDecimalWithComma = decimal => parseInt(decimal.replace(/,/g, ''), 10)

fetch('https://raw.githubusercontent.com/derhuerst/emailproviders/master/generate/domains.txt', {
	redirect: 'follow'
})
.then((res) => res.text())
.then((data) => {
	const all = uniq(
		data.split('\n')
		.map((d) => d.trim())
		.filter((d) => d.length > 0)
	).sort()
	console.info(`Fetched list of providers. all.json will contain ${all.length}.`)

	fs.writeFile('all.json', JSON.stringify(all), (err) => {
		if (err) throw err
	})

	const q = queue({concurrency: 20, timeout: 3000})
	for (let provider of all) {
		const job = (cb) => {
			fetchStats(provider)
			.then((data) => {
				if (data.globalRank === '-') return cb(null, null)
				const rank = parseDecimalWithComma(data.globalRank, 10)
				if (Number.isNaN(rank)) throw new Error('invalid response')
				cb(null, rank)
			})
			.catch(cb)
		}
		job.provider = provider
		q.push(job)
	}

	const common = []
	q.on('timeout', (job) => console.error('timeout:', job.provider))
	q.on('success', (rank, job) => {
		if (rank !== null && rank > 0 && rank < 30000)
			common.push([job.provider, rank])
	})
	q.on('end', (job) => {
		console.info(`Fetched alexa rankings. common.json will contain the ${common.length} most common.`)
		const sorted = common
			.sort((a, b) => a[1] - b[1])
			.map((a) => a[0])
		fs.writeFile('common.json', JSON.stringify(sorted), (err) => {
			if (err) throw err
		})
	})
	q.start()

	q.on('error', console.error)

})
.catch((err) => {
	console.error(err.message)
	process.exit(1)
})
