const Express = require('express')
const Router = Express.Router()

const {
  viewAllAnnouncements,
  viewParticularAnnouncement,
  submitAnnouncementResponse,
  viewAnnouncementByUser,
} = require('../../../../Utils/Announcements/announcements.utils')

Router.route('/viewAllAnnouncement').get(viewAllAnnouncements)
Router.route('/viewAnnouncement/:AnnouncementID').get(
  viewParticularAnnouncement
)
Router.route('/viewAnnouncementByUser/:userName').get(viewAnnouncementByUser)
Router.route('/submitAnnouncementResponse').post(submitAnnouncementResponse)

module.exports = Router
