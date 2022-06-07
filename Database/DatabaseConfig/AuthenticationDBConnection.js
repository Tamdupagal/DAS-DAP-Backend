require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL_AUTHENTICATIONDB

const connection = require('mongoose').createConnection(dbURL)

module.exports = connection
