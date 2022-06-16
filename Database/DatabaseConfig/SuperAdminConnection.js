require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL_SUPER_ADMIN
const connection = require('mongoose').createConnection(dbURL)
const companyModel = connection.model(
  'Companies',
  require('../Models/CompanyModel')
)

module.exports = { connection, companyModel }
