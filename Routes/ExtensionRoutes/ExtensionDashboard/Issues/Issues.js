const Express = require('express')
const Router = Express.Router()
const { createIssue } = require('../../../../Utils/Issues/Issues.utils')
const { issueValidation } = require('../../../../Validators/IssueValidator')

Router.route('/').post(issueValidation, createIssue)
module.exports = Router
