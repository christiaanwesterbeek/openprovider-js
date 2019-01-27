require('dotenv').config()

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
  console.log(`Running '${command}' with params ${JSON.stringify(params)}...`)
  const result = await OpenproviderClient.request(command, params)

  const { code, desc, data } = result.openXML.reply

  if (!data) {
    throw new Error(`${desc} (${code})`)
  }

  const {
    total,
    results: { array: { item } }
  } = data

  console.log(`Result has '${total}' items`)

  return {code, desc, total, data: item}
}

const argv = require('minimist')(process.argv.slice(2))

const { _: [command], ...params } = argv

run(command, params)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })
