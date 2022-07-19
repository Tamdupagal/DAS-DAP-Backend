const Express = require('express')
const Router = Express.Router()

const {
  createTaskFlow,
  updateTaskFlow,
  fetchTaskFlow,
  fetchTaskFlows,
  deleteTaskFlow,
  fetchTaskFlowsByApplication,
} = require('../../../../Utils/Tasks/Tasks.utils')

const {
  taskFlowValidation,
} = require('../../../../Validators/TaskflowValidation')

Router.route('/createTaskFlow').post(taskFlowValidation, createTaskFlow)
Router.route('/updateTaskFlow/:applicationTaskFlowUseCase').post(updateTaskFlow)
Router.route('/viewAllTaskFlow').get(fetchTaskFlows)
Router.route('/viewTaskFlow/:applicationTaskFlowUseCase').get(fetchTaskFlow)
Router.route('/viewTaskFlows/search?').get(fetchTaskFlowsByApplication)
Router.route('/deleteTaskFlow/:applicationTaskFlowUseCase').delete(
  deleteTaskFlow
)

module.exports = Router
