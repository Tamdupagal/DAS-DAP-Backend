const Express = require('express')
const Router = Express.Router()

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

const Tasks = require('./Tasks/Tasks')
const User = require('./Users/Users')
const FeedBack = require('./FeedBack/FeedBack')
const Announcement = require('./Announcements/Announcements')
const Analytics = require("./Analytics/Analytics")
const Notification = require("./Notification/Notification")
const queryValidator = require('../../../Validators/QueryValidator')


Router.use('/tasks', [queryValidator, Tasks])
Router.use('/users', [queryValidator, User])
Router.use('/announcements', Announcement)
Router.use('/feedBacks', FeedBack)
Router.use('/analytics',Analytics )
Router.use('/notification',Notification )
Router.use('/logout', hasLoggedOut)

module.exports = Router
