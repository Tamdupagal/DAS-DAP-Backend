require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL_DEFAULT

const connection = require('mongoose').createConnection(dbURL)

module.exports = connection
