const Express = require("express");
const Router = Express.Router();

const {
  createTaskFlow,
  updateTaskFlow,
  fetchTaskFlow,
  deleteTaskFlow,
  fetchTaskFlowForCheckList,
} = require("../../../../Utils/Tasks/Tasks.utils");

const {
  taskFlowValidation,
} = require("../../../../Validators/TaskflowValidation");

Router.route("/").post(taskFlowValidation, createTaskFlow);
Router.route("/search?").put(updateTaskFlow);
Router.route("/search?").get(fetchTaskFlow);
Router.route("/flows").get(fetchTaskFlowForCheckList);
Router.route("/search?").delete(deleteTaskFlow);

module.exports = Router;
