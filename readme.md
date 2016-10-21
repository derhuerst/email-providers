# email-providers

**A list of common eMail providers.** [Thanks to @goware](https://github.com/goware/emailproviders)!

`all.json` contains roughly 4k domains of email providers. `common.json` contains those with an [Alexa rank](https://en.wikipedia.org/wiki/List_of_most_popular_websites) of `< 30000`.

[![npm version](https://img.shields.io/npm/v/email-providers.svg)](https://www.npmjs.com/package/email-providers)
[![build status](https://img.shields.io/travis/derhuerst/email-providers.svg)](https://travis-ci.org/derhuerst/email-providers)
[![dependency status](https://img.shields.io/david/derhuerst/email-providers.svg)](https://david-dm.org/derhuerst/email-providers)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/email-providers.svg)](https://david-dm.org/derhuerst/email-providers#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/email-providers.svg)


## Installing

```shell
npm install email-providers
```


## Usage

```
const all = require('email-providers/all.json')
const common = require('email-providers/common.json')

console.log(all[0], all.length) // 1033edge.com 3939
console.log(common[0], common.length) // yahoo.com 123
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/email-providers/issues).
