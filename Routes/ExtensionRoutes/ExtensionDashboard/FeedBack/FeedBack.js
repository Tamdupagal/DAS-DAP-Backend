const Express = require('express')
const Router = Express.Router()

const {
  viewFeedBackQuestions,
  submitFeedBackResponse,
} = require('../../../../Utils/FeedBack/feedback.utils')

Router.route('/search?').get(viewFeedBackQuestions)
Router.route('/submit?').post(submitFeedBackResponse)

module.exports = Router
