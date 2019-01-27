require('dotenv').config()
const chalk = require('chalk')
const log = console.log

// Require client
const Openprovider = require('./index')

const config = {
  username: process.env.OP_USERNAME,
  // password or hash. If you fill both hash is used.
  password: process.env.OP_PASSWORD,
  hash: process.env.OP_HASH,
  cli: true
}

// Create new client using hash
const OpenproviderClient = new Openprovider(config)

// Example dns request using promises
const run = async (command, params) => {
  log(chalk`Running {green ${command}} with params {green ${JSON.stringify(params)}}...`)
  const result = await OpenproviderClient.request(command, params)

  const { code, desc, data } = result.openXML.reply

  if (code > 0) {
    throw new Error(`${desc} (${code})`)
  }

  const {
    id, status,
    total, results
  } = data

  const deepResults = results && results.array && results.array.item

  if (results != null && id) {
    log(chalk`Result has {green ${total}} items and id {green ${id}} with status {green ${status}}`)
    log(deepResults)
  } else if (results != null) {
    log(chalk`Result has {green ${total}} items`)
    log(deepResults)
  } else if (id) {
    log(chalk`Result has id {green ${id}} with status {green ${status}}`)
  } else {
    log(data)
  }

  return {
    id, status,
    total, results: deepResults
  }
}

const argv = require('minimist')(process.argv.slice(2))

const { _: [command], ...params } = argv

run(command, params)
  .catch((error) => {
    log(chalk.red(error))
  })
