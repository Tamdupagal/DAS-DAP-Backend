const Express = require('express')
const Router = Express.Router()

const {
  createFeedBack,
  viewFeedBackQuestions,
  viewFeedBackResponses,
  submitFeedBackResponse,
  createUserFeedBack,
  getUserFeedBack,
  updateUserFeedBack,
  deleteUserFeedBack,
  searchFeedback
} = require('../../../../Utils/FeedBack/feedback.utils')
const {
  feedBackSchemaValidation,
} = require('../../../../Validators/FeedBackValidation')

Router.post('/', createFeedBack)
Router.route('/search?').get(viewFeedBackQuestions)
Router.route('/searchResponses?').get(viewFeedBackResponses)
// Router.route('/userFeedBack').get()
Router.route('/userFeedBack').post(createUserFeedBack)
Router.route('/userFeedBack').get(getUserFeedBack)
Router.route('/userFeedBack/:id').put(updateUserFeedBack)
Router.route('/userFeedBack/:id').delete(deleteUserFeedBack)
Router.route('/userFeedback/search?').get(searchFeedback)



// Router.route('/submit').post(submitFeedBackResponse)

module.exports = Router
