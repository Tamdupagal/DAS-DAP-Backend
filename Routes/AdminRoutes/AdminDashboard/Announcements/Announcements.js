const Express = require('express')
const Router = Express.Router()

const {
  createAnnouncement,
  viewAllAnnouncements,
  viewParticularAnnouncement,
  viewAllAnnouncementResponses,
  viewParticularAnnouncementResponses,
  viewAnnouncementByUser,
  // updateAnnouncements,
  // deleteAnnouncement,
  // deleteAllAnnouncements,
} = require('../../../../Utils/Announcements/announcements.utils')
const {
  announcementSchemaValidation,
} = require('../../../../Validators/AnnouncementValidation')

Router.post('/createAnnouncement', [
  announcementSchemaValidation,
  createAnnouncement,
])
Router.route('/viewAllAnnouncement').get(viewAllAnnouncements)
Router.route('/viewAnnouncement/:AnnouncementID').get(
  viewParticularAnnouncement
)
Router.route('/viewAllAnnouncementResponses').get(viewAllAnnouncementResponses)
Router.route('/viewAnnouncementResponse/:AnnouncementID').get(
  viewParticularAnnouncementResponses
)

// Router.route('/updateAnnouncement').put(updateAnnouncements)
// Router.route('/deleteAnnouncement/:announcementID').delete(deleteAnnouncement)
// Router.route('/deleteAllAnnouncements').delete(deleteAllAnnouncements)

module.exports = Router
