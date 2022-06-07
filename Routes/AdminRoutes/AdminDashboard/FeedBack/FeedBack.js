const Express = require('express')
const Router = Express.Router()

const {
  createFeedBack,
  viewAllFeedBackQuestions,
  viewAllFeedBackResponses,
  submitFeedBackResponse,
  // updateFeedBackQuestions,
  // deleteFeedBackQuestions,
} = require('../../../../Utils/FeedBack/feedback.utils')
const {
  feedBackSchemaValidation,
} = require('../../../../Validators/FeedBackValidation')

// Router.route('/createFeedBack').post(createFeedBack)
Router.post('/createFeedBack', [feedBackSchemaValidation, createFeedBack])
Router.route('/viewAllFeedBackQuestions').get(viewAllFeedBackQuestions)
Router.route('/viewAllFeedBackResponses').get(viewAllFeedBackResponses)
Router.route('/submitFeedBack').post(submitFeedBackResponse)
// Router.route('/updateFeedBack').put(updateFeedBackQuestions)
// Router.route('/deleteFeedBack').delete(deleteFeedBackQuestions)

module.exports = Router
