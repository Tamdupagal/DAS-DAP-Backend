const Express = require('express')
const Router = Express.Router()

const {
  viewAnnouncements,
  submitAnnouncementResponse,
} = require('../../../../Utils/Announcements/announcements.utils')

Router.route('/search?').get(viewAnnouncements)
Router.route('/submit?').post(submitAnnouncementResponse)

module.exports = Router
