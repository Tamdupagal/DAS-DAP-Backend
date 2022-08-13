const Express = require('express')
const Router = Express.Router()

const {
  createAnnouncement,
  viewAnnouncementResponse,
  viewAnnouncements,
} = require('../../../../Utils/Announcements/announcements.utils')
const {
  announcementSchemaValidation,
} = require('../../../../Validators/AnnouncementValidation')

Router.post('/', [announcementSchemaValidation, createAnnouncement])
Router.route('/search?').get(viewAnnouncements)
Router.route('/searchResponses?').get(viewAnnouncementResponse)
module.exports = Router
