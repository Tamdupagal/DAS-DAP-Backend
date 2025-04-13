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
const adminUpdates = connection.model(
  'adminUpdates',
  require('../Models/AdminUpdates')
)
const adminQuery = connection.model(
  'adminQuery',
  require('../Models/ChatQueryModel')
)
const Registration = connection.model(
  'dijitizationWeb',
  require('../Models/RegistrationModel')
)
const issueModel = connection.model('Issues', require('../Models/Issue'))
module.exports = { connection, companyModel,SuperAdminFeedback,SuperAdminAnnouncement, issueModel, adminUpdates,adminQuery,Registration}
