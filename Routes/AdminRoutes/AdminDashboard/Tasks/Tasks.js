const Express = require('express')
const { fetchTaskFlow } = require('../../../../Utils/Tasks/Tasks.utils')
const Router = Express.Router()

Router.route('/search?').get(fetchTaskFlow)

module.exports = Router
