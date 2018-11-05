# email-providers

**A list of common eMail providers.** [Thanks to @goware](https://github.com/goware/emailproviders)!

`all.json` contains roughly 4k domains of email providers. `common.json` contains those with an [Alexa rank](https://en.wikipedia.org/wiki/List_of_most_popular_websites) of `< 30000`.

[![npm version](https://img.shields.io/npm/v/email-providers.svg)](https://www.npmjs.com/package/email-providers)
[![build status](https://img.shields.io/travis/derhuerst/email-providers.svg)](https://travis-ci.org/derhuerst/email-providers)
[![dependency status](https://img.shields.io/david/derhuerst/email-providers.svg)](https://david-dm.org/derhuerst/email-providers)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/email-providers.svg)](https://david-dm.org/derhuerst/email-providers#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/email-providers.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install email-providers
```


## Usage

The [package published to npm](https://npmjs.com/email-proivders) contains two files `all.json` and `common.json`.

```
const all = require('email-providers/all.json')
const common = require('email-providers/common.json')

all.length    // 4149
common.length // 187
all[0]        // 1033edge.com
common[0]     // yahoo.com
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/email-providers/issues).
