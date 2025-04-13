const Express = require('express')
const Router = Express.Router()
const Companies = require('./Companies/Company')
const Issues = require('./Issues/Issues')
const Announcement = require('./Announcement/Announcement')
const FeedBack = require('./Feedback/Feedback')
const Updates = require('./Updates/Updates')
const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')
const { getregisterdUser } = require('../../../Utils/Company/Company.utils')

Router.use('/companies', Companies)
Router.use('/announcements',Announcement)
Router.use('/updates',Updates)
Router.use('/feedbacks',FeedBack)
Router.use('/issues', Issues)
Router.get('/register',getregisterdUser)
Router.get('/logout', hasLoggedOut)

module.exports = Router
