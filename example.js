// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const all = require('./all.json')
const common = require('./common.json')

all.length
common.length
all[0]
common[0]
