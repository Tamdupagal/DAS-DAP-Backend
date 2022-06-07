const Express = require('express')
const Router = Express.Router()

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

const Tasks = require('./Tasks/Tasks')
const User = require('./Users/Users')
const FeedBack = require('./FeedBack/FeedBack')

Router.use('/Tasks', Tasks)
Router.use('/User', User)
Router.use('/FeedBack', FeedBack)
Router.use('/Logout', hasLoggedOut)

module.exports = Router
