const Express = require('express')
const Router = Express.Router()
const Tasks = require('./Tasks/Tasks')

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

Router.use('/Tasks', Tasks)
Router.get('/Logout', hasLoggedOut)

module.exports = Router
