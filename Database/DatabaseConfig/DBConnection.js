require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL

const connection = require('mongoose').createConnection(dbURL)

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
module.exports = {
  connection,
  feedBackModel,
  feedBackResponseModel,
  UserModel,
  UserCreatedModel,
}
