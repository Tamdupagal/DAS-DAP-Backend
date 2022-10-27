const Express = require('express')
const Router = Express.Router()
const Companies = require('./Companies/Company')
const Issues = require('./Issues/Issues')
const Announcement = require('./Announcement/Announcement')
const FeedBack = require('./Feedback/Feedback')
const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

Router.use('/companies', Companies)
Router.use('/announcements',Announcement)
Router.use('/feedbacks',FeedBack)
Router.use('/issues', Issues)
Router.get('/logout', hasLoggedOut)

module.exports = Router
