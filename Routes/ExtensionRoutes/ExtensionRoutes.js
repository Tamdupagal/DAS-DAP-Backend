const Express = require('express')
const {
  isAuthorized,
  hasLoggedOut,
} = require('../../Services/AuthenticationServices/Authentication')

const Router = Express.Router()
const Dashboard = require('./ExtensionDashboard/Dashboard')

Router.use('/Login', isAuthorized)
Router.use('/Dashboard', Dashboard)

module.exports = Router
