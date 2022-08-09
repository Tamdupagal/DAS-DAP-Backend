const Express = require('express')
const Router = Express.Router()

const {
  createAnnouncement,

  viewAnnouncementResponse,
  viewAnnouncements,

  // updateAnnouncements,
  // deleteAnnouncement,
  // deleteAllAnnouncements,
} = require('../../../../Utils/Announcements/announcements.utils')
const {
  announcementSchemaValidation,
} = require('../../../../Validators/AnnouncementValidation')

Router.post('/new', [announcementSchemaValidation, createAnnouncement])
Router.route('/search?').get(viewAnnouncements)
Router.route('/searchResponses?').get(viewAnnouncementResponse)
// Router.route('/viewAnnouncementResponse/:AnnouncementID').get(
//   viewParticularAnnouncementResponses
// )

// Router.route('/updateAnnouncement').put(updateAnnouncements)
// Router.route('/deleteAnnouncement/:announcementID').delete(deleteAnnouncement)
// Router.route('/deleteAllAnnouncements').delete(deleteAllAnnouncements)

module.exports = Router
