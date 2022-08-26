const Express = require('express')
const Router = Express.Router()
const Tasks = require('./Tasks/Tasks')
const FeedBack = require('./FeedBack/FeedBack')
// const Announcement = require('../ExtensionDashboard/Announcements/Announcements')
const Users = require('../ExtensionDashboard/Users/Users')
const Issue = require('./Issues/Issues')
const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')
const queryValidator = require('../../../Validators/QueryValidator')

Router.use('/tasks', [queryValidator, Tasks])
Router.use('/issues', Issue)
Router.use('/feedBacks', FeedBack)
// Router.use('/announcements', Announcement)
Router.use('/users', [queryValidator, Users])
Router.get('/logout', hasLoggedOut)

module.exports = Router
