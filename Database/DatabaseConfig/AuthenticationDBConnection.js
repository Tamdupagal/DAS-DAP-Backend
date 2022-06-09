require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL_AUTHENTICATIONDB
const connection = require('mongoose')
  .createConnection(dbURL)
  .useDb('AuthenticationDB')
console.log(connection)

module.exports = connection
