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
  return {
    connection,
    analyticsModel,
    feedBackModel,
    feedBackResponseModel,
    userModel,
    taskFlowModel,
  }
}

module.exports = dependencyInjector
