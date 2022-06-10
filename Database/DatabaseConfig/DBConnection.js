require('dotenv').config()
const defaultConnection = require('../DatabaseConfig/DefaultConnection')
// const dbURL = process.env.MONGO_CONNECTION_URL

const connection = defaultConnection.useDb('DigitalAidedSchools')

const feedBackModel = connection.model(
  'FeedBack',
  require('../Models/FeedBackModel')
)
const feedBackResponseModel = connection.model(
  'FeedBackResponse',
  require('../Models/FeedBackResponseModel')
)
const UserModel = connection.model('User', require('../Models/UserModel'))
const UserCreatedModel = connection.model(
  'UserCreated',
  require('../Models/UserCreatedModel')
)

const TaskFlowModel = connection.model(
  'Taskflow',
  require('../Models/TaskProcessModel')
)

const AnnouncementModel = connection.model(
  'Announcement',
  require('../Models/AnnouncementSchema')
)

const AnnouncementResponseModel = connection.model(
  'Announcement Response',
  require('../Models/AnnouncementResponseSchema')
)

module.exports = {
  connection,
  feedBackModel,
  feedBackResponseModel,
  UserModel,
  UserCreatedModel,
  TaskFlowModel,
  AnnouncementResponseModel,
  AnnouncementModel,
}
