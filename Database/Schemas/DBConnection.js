require('dotenv').config()
const { defaultConnection } = require('../DatabaseConfig/DefaultConnection')

const dependencyInjector = (dataBaseName) => {
  const connection = defaultConnection.useDb(dataBaseName)
  const feedBackModel = connection.model(
    'FeedBack',
    require('../Models/FeedBackModel')
  )
  const feedBackResponseModel = connection.model(
    'FeedBackResponse',
    require('../Models/FeedBackResponseModel')
  )
  const UserModel = connection.model('User', require('../Models/UserModel'))

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
  return {
    connection,
    feedBackModel,
    feedBackResponseModel,
    UserModel,
    TaskFlowModel,
    AnnouncementResponseModel,
    AnnouncementModel,
  }
}

module.exports = dependencyInjector
