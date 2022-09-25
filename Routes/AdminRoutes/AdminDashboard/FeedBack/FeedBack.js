const Express = require('express')
const Router = Express.Router()

const {
  createFeedBack,
  viewFeedBackQuestions,
  viewFeedBackResponses,
  submitFeedBackResponse,
} = require('../../../../Utils/FeedBack/feedback.utils')
const {
  feedBackSchemaValidation,
} = require('../../../../Validators/FeedBackValidation')

Router.post('/', createFeedBack)
Router.route('/search?').get(viewFeedBackQuestions)
Router.route('/searchResponses?').get(viewFeedBackResponses)
// Router.route('/submit').post(submitFeedBackResponse)

module.exports = Router
