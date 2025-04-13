const Express = require('express')
const { SuperAdminAuthorization } = require('../../Services/AuthenticationServices/Authentication')

const Router = Express.Router()
const Dashboard = require('./SuperAdminDashboard/Dashboard')

Router.use('/dashboard', [SuperAdminAuthorization, Dashboard])

module.exports = Router
