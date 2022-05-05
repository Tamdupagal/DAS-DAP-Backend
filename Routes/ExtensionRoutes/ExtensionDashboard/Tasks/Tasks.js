const Express = require('express')
const Router = Express.Router()

const {
  createTaskFlow,
  updateTaskFlow,
  fetchTaskFlow,
  fetchTaskFlows,
  deleteTaskFlow,
} = require('../../../../Utils/Tasks/Tasks.utils')

Router.route('/createTaskFlow').post(createTaskFlow)
Router.route('/updateTaskFlow/:applicationTaskFlowUseCase').post(updateTaskFlow)
Router.route('/viewAllTaskFlow').get(fetchTaskFlows)
Router.route('/viewTaskFlow/:applicationTaskFlowUseCase').get(fetchTaskFlow)
Router.route('/deleteTaskFlow').post(deleteTaskFlow)

module.exports = Router
