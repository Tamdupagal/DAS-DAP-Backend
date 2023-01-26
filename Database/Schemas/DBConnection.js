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
  const userModel = connection.model('User', require('../Models/UserModel'))

  const taskFlowModel = connection.model(
    'Taskflow',
    require('../Models/TaskProcessModel')
  )
  const analyticsModel = connection.model(
    'Analytics',
    require('../Models/TaskFlowAnalytics')
  )
  const AnnouncementModel = connection.model(
    'Announcment',
    require('../Models/AnnouncementSchema')
  )
  const UserFeedBackModel = connection.model(
    'userFeedBack',
    require('../Models/UserFeedBack')
  )
  const ChatModel = connection.model(
    'Chats',
    require('../Models/ChatModel')
  )
  const GroupChatModel = connection.model(
    'GroupChat',
    require('../Models/GroupChatModel')
  )
  const taskManagementModel = connection.model(
    'TaskManagement',
    require('../Models/TaskManagementModel')
  )
  const taskAnalyticsModel = connection.model(
    'TaskAnalytics',
    require('../Models/TaskManagementAnalytics')
  )
  const notificationModel = connection.model(
    'Notification',
    require('../Models/NotificationModel')
  )
  return {
    connection,
    analyticsModel,
    feedBackModel,
    feedBackResponseModel,
    userModel,
    taskFlowModel,
    AnnouncementModel,
    UserFeedBackModel,
    ChatModel,
    taskManagementModel,
    GroupChatModel,
    taskAnalyticsModel,
    notificationModel
  }
}

module.exports = dependencyInjector
