const Express = require('express')
const Router = Express.Router()

const {
  createTaskFlow,
  updateTaskFlow,
  fetchTaskFlow,
  fetchTaskFlows,
  deleteTaskFlow,
} = require('../../../../Utils/Tasks/Tasks.utils')

Router.route('/createCompany').post(createTaskFlow)
Router.route('/updateCompany/:applicationTaskFlowUseCase').post(updateTaskFlow)
Router.route('/viewAllCompany').get(fetchTaskFlows)
Router.route('/viewCompany/:applicationTaskFlowUseCase').get(fetchTaskFlow)
Router.route('/deleteCompany/:applicationTaskFlowUseCase').delete(
  deleteTaskFlow
)

module.exports = Router
