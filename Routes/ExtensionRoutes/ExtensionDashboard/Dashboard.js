const Express = require('express')
const Router = Express.Router()
const Tasks = require('./Tasks/Tasks')
const FeedBack = require('./FeedBack/FeedBack')

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

Router.use('/Tasks', Tasks)
Router.use('/FeedBack', FeedBack)
Router.get('/Logout', hasLoggedOut)

module.exports = Router
