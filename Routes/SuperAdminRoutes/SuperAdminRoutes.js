const Express = require('express')

const Router = Express.Router()
const Dashboard = require('./SuperAdminDashboard/Dashboard')

Router.use('/Dashboard', [Dashboard])

module.exports = Router
