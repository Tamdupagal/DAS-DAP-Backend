const Express = require('express')
const Router = Express.Router()

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

const Tasks = require('./Tasks/Tasks')
const User = require('./Users/Users')
Router.use('/Tasks', Tasks)
Router.use('/User', User)
Router.use('/Logout', hasLoggedOut)

module.exports = Router
