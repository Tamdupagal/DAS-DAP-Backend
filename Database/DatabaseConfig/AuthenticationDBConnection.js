require('dotenv').config()
const authenticationConnection = require('mongoose').createConnection(
  process.env.MONGO_CONNECTION_URL_AUTHENTICATIONDB
)
const EnrolledCompanies = authenticationConnection.model(
  'Enrolled Companies',
  require('../Models/EnrolledCompanies')
)
const dependencyInjector = (collectionName) => {
  const companyUserModel = authenticationConnection.model(
    collectionName,
    require('../Models/UserModel')
  )
  const companyUserCreatedModel = authenticationConnection.model(
    collectionName,
    require('../Models/UserModel')
  )

  return {
    authenticationConnection,
    companyUserCreatedModel,
    companyUserModel,
  }
}

module.exports = { dependencyInjector, EnrolledCompanies }
