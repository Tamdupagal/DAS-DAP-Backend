const Express = require('express')
const Router = Express.Router()

const {
  viewAllFeedBackQuestions,
  submitFeedBackResponse,
} = require('../../../../Utils/FeedBack/feedback.utils')

Router.route('/viewFeedBack').get(viewAllFeedBackQuestions)
Router.route('/submitFeedBack').post(submitFeedBackResponse)

module.exports = Router
