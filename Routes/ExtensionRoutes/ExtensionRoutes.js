const Express = require('express')
const Router = Express.Router()
const Dashboard = require('./ExtensionDashboard/Dashboard')
const databaseInitialize = require('../../Database/DatabaseConfig/databaseInitialize')
const {
  isAuthenticated,
  DatabaseValidation,
} = require('../../Services/AuthenticationServices/Authentication')

Router.use('/Dashboard/:databaseID', [
  isAuthenticated,
  DatabaseValidation,
  databaseInitialize,
  Dashboard,
])

module.exports = Router
