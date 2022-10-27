require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL_SUPER_ADMIN
const connection = require('mongoose').createConnection(dbURL)
const companyModel = connection.model(
  'Companies',
  require('../Models/CompanyModel')
)
const SuperAdminAnnouncement = connection.model(
  'SuperAdminAnnouncement',
  require('../Models/AnnouncementSchema')
)
const SuperAdminFeedback = connection.model(
  'SuperAdminFeedback',
  require('../Models/UserFeedBack')
)
const issueModel = connection.model('Issues', require('../Models/Issue'))
module.exports = { connection, companyModel,SuperAdminFeedback,SuperAdminAnnouncement, issueModel }
