const Express = require('express')
const {
  fetchTaskFlows,
  fetchTaskFlow,
} = require('../../../../Utils/Tasks/Tasks.utils')
const Router = Express.Router()

Router.route('/viewAllTaskFlow').get(fetchTaskFlows)

Router.route('/viewTaskFlow/:applicationTaskFlowUseCase').get(fetchTaskFlow)

module.exports = Router
