const Express = require('express')
const Router = Express.Router()
const Tasks = require('./Tasks/Tasks')
const FeedBack = require('./FeedBack/FeedBack')
// const CheckList = require('./CheckList/CheckList')
// const Announcement = require('../ExtensionDashboard/Announcements/Announcements')
const Users = require('../ExtensionDashboard/Users/Users')
const Issue = require('./Issues/Issues')
const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')
const queryValidator = require('../../../Validators/QueryValidator')

const Analytics = require('../ExtensionDashboard/Analytics/Analytics')

Router.use('/tasks', [queryValidator, Tasks])
Router.use('/issues', Issue)
Router.use('/feedBacks', FeedBack)
// Router.use("/checklist", CheckList);
Router.use("/analytics",Analytics)
// Router.use('/announcements', Announcement)
Router.use('/users', [queryValidator, Users])
Router.get('/logout', hasLoggedOut)

module.exports = Router
