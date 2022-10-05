// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

const all = require('./all.json')
const common = require('./common.json')

console.log(`from all.json (${all.length}:`)
console.log(all[Math.floor(Math.random() * all.length)])

console.log(`from common.json (${common.length}):`)
console.log(common[Math.floor(Math.random() * common.length)])
