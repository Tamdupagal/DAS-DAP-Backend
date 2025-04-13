const Express = require('express')
const {
  isAuthenticated,
} = require('../../Services/AuthenticationServices/Authentication')

const Router = Express.Router()
// const Tasks = require('./Tasks/Tasks')
// const User = require('./Users/User')

// Router.use('/Tasks', [isAuthenticated, Tasks])
// Router.use('/Users', [isAuthenticated, User])

module.exports = Router
