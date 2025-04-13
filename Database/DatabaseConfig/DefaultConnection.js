require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL_DEFAULT

const defaultConnection = require('mongoose').createConnection(dbURL)

module.exports = { defaultConnection }
