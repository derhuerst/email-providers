'use strict'

const fetch = require('node-fetch')
const uniq = require('lodash.uniq')
const queue = require('queue')
const rank = require('alexarank')
const fs = require('fs')

fetch('https://raw.githubusercontent.com/derhuerst/emailproviders/master/generate/domains.txt')
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
		const job = (cb) =>
			rank(provider, (err, data) => {
				if (err) cb(err)
				else cb(null, data && data.rank ? +data.rank : 0)
			})
		job.provider = provider
		q.push(job)
	}

	const common = []
	q.on('timeout', (job) => console.error('timeout:', job.provider))
	q.on('success', (rank, job) => {
		if (rank > 0 && rank < 30000)
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

})
.catch((err) => {
	console.error(err.message)
	process.exit(1)
})
