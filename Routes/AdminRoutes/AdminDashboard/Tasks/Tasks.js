const Express = require('express')
const { fetchTaskFlow, fetchMyTasks, createTask, getTask, deleteTask, updateTask } = require('../../../../Utils/Tasks/Tasks.utils')
const Router = Express.Router()

Router.route('/search?').get(fetchTaskFlow)
Router.route('/myTasks?').get(fetchMyTasks)

// task management routes

Router.route('/taskManagement').post(createTask).get(getTask)
Router.route('/taskManagement/:id').delete(deleteTask).put(updateTask)
// Router.route('/taskManagement')




module.exports = Router
