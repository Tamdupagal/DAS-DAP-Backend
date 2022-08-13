const Express = require('express')
const Router = Express.Router()

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

const Tasks = require('./Tasks/Tasks')
const User = require('./Users/Users')
const FeedBack = require('./FeedBack/FeedBack')
const Announcement = require('./Announcements/Announcements')

Router.use('/tasks', Tasks)
Router.use('/user', User)
Router.use('/announcement', Announcement)
Router.use('/feedBack', FeedBack)
Router.use('/logout', hasLoggedOut)

module.exports = Router
