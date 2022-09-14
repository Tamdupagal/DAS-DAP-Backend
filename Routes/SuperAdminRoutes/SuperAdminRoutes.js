const Express = require('express')

const Router = Express.Router()
const Dashboard = require('./SuperAdminDashboard/Dashboard')

Router.use('/dashboard', Dashboard)

module.exports = Router
