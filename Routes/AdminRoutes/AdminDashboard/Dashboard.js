const Express = require('express')
const Router = Express.Router()

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

const Tasks = require('./Tasks/Tasks')
// const UserMetrics = require('./UsersMetrics/UsersMetrics')
Router.use('/Tasks', Tasks)
// Router.use('/UserMetrics', UserMetrics)
Router.use('/Logout', hasLoggedOut)

module.exports = Router
