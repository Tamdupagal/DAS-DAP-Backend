const Express = require('express')
const Router = Express.Router()
const Dashboard = require('./AdminDashboard/Dashboard')
const databaseInitialize = require('../../Database/DatabaseConfig/databaseInitialize')

const {
  isAuthenticated,
  DatabaseValidation, 
} = require( '../../Services/AuthenticationServices/Authentication' )

const { getAllQuery, postQuery, deleteQuery } = require('../../Utils/Updates/Updates.utils')

Router.use('/dashboard/:databaseID', [
  isAuthenticated,
  DatabaseValidation,
  databaseInitialize,
  Dashboard,
])

module.exports = Router
