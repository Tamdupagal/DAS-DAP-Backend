const Express = require('express')
const Router = Express.Router()

const {
  createTaskFlow,
  updateTaskFlow,
  fetchTaskFlow,
  deleteTaskFlow,
  fetchTaskFlowsByApplication,
} = require('../../../../Utils/Tasks/Tasks.utils')

const {
  taskFlowValidation,
} = require('../../../../Validators/TaskflowValidation')

Router.route('/new').post(taskFlowValidation, createTaskFlow)
Router.route('/search?').put(updateTaskFlow)
Router.route('/search?').get(fetchTaskFlow)
Router.route('/search?').delete(deleteTaskFlow)

module.exports = Router
