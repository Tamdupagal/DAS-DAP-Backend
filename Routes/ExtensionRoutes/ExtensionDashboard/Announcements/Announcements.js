const Express = require('express')
const Router = Express.Router()

const {
  viewParticularAnnouncement,
  submitAnnouncementResponse,
  viewAnnouncementByUser,
} = require('../../../../Utils/Announcements/announcements.utils')

Router.route('/search?').get((req, res, next) => {
  req.query.userID
    ? viewAnnouncementByUser(req, res, next)
    : viewParticularAnnouncement(req, res, next)
})
Router.route('/submit?').post(submitAnnouncementResponse)

module.exports = Router
