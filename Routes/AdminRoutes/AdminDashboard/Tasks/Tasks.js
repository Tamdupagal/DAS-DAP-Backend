const Express = require('express')
const { fetchTaskFlow, fetchMyTasks, createTask, getTask, deleteTask, updateTask,  UpdatestarredTasks, getStarredTasks, getCompletedTask, getLabeledTask, assignedToMeTask, assignedByMeTask, fetchMyTasksWithDomain } = require('../../../../Utils/Tasks/Tasks.utils')
const Router = Express.Router()

Router.route('/search?').get(fetchTaskFlow)
Router.route('/myTasks?').get(fetchMyTasks)
// Router.route('/fetchMyTasksWithDomain?').get(fetchMyTasksWithDomain)
// task management routes

Router.route('/taskManagement').post(createTask).get(getTask)
Router.route('/taskManagement/:id').delete(deleteTask).put(updateTask)
Router.route('/taskmanagement/myTasks/starred').put(UpdatestarredTasks) 
Router.route('/taskmanagement/myTasks/starred').get(getStarredTasks)
Router.route('/taskmanagement/myTasks/completedTasks').get(getCompletedTask)
Router.route('/taskmanagement/myTasks/labeledTasks').get(getLabeledTask)
Router.route('/taskmanagement/myTasks/assignedToMe/:id').get(assignedToMeTask)
Router.route('/taskmanagement/myTasks/assignedByMe/:id').get(assignedByMeTask)

// Router.route('/taskManagement')




module.exports = Router
