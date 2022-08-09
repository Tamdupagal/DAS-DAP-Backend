const Express = require('express')
const Router = Express.Router()
const Tasks = require('./Tasks/Tasks')
const FeedBack = require('./FeedBack/FeedBack')
const Announcement = require('../ExtensionDashboard/Announcements/Announcements')
const Users = require('../ExtensionDashboard/Users/Users')
const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

Router.use('/Tasks', Tasks)
Router.use('/FeedBack', FeedBack)
Router.use('/Announcement', Announcement)
Router.use('/Users', Users)
Router.get('/Logout', hasLoggedOut)

module.exports = Router
