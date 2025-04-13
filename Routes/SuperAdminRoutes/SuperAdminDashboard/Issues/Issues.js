const Express = require('express')
const Router = Express.Router()
const {
  viewIssue,
  updateIssue,
} = require('../../../../Utils/Issues/Issues.utils')

Router.route('/search?').get(viewIssue)
Router.route('/search?').put(updateIssue)

module.exports = Router
