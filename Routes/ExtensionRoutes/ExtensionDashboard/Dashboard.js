const Express = require('express')
const Router = Express.Router()
const Tasks = require('./Tasks/Tasks')
const FeedBack = require('./FeedBack/FeedBack')
const Announcement = require('../ExtensionDashboard/Announcements/Announcements')
const Users = require('../ExtensionDashboard/Users/Users')
const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')
const queryValidator = require('../../../Validators/QueryValidator')

Router.use('/tasks', [queryValidator, Tasks])
Router.use('/feedBack', FeedBack)
Router.use('/announcement', Announcement)
Router.use('/users', Users)
Router.get('/logout', hasLoggedOut)

module.exports = Router
