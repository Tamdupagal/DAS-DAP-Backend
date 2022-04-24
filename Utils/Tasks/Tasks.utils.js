const crypto = require('crypto')
const TaskProcessModel = require('../../Database/Models/TaskProcessModel')

// Create Task Flow

const createTaskFlow = async (req, res) => {
  try {
    let newTask = new TaskProcessModel({
      taskID: await crypto.randomBytes(20).toString('hex'),
      applicationID:
        req.body.applicationName +
        '-' +
        (await crypto.randomBytes(2).toString('hex')),
      applicationName: req.body.applicationName,
      applicationURL: req.body.applicationURL,
      applicationFLowURL:
        req.body.applicationURL +
        '/' +
        (await req.body.applicationTaskFlowUseCase.toLowerCase()),
      applicationTaskFlowUseCase: req.body.applicationTaskFlowUseCase,
      taskList: req.body.taskList,
    })
    await newTask.save()
    res.status(200).send({ status: 200, Message: 'Task Flow published!' })
  } catch (err) {
    res.status(400).send({ status: 400, message: "Task Flow can't be saved" })
  }
}

// Fetch Task Flow

const fetchTaskFlow = async (req, res, next) => {
  try {
    let taskFlow = await TaskProcessModel.findOne({
      applicationTaskFlowUseCase: req.params.applicationTaskFlowUseCase,
    })
    if (taskFlow === null) {
      throw new Error('No such Entry found')
    }
    res.status(200).send({ status: 200, taskFlow })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}

const fetchTaskFlows = async (req, res, next) => {
  try {
    let taskFlows = await TaskProcessModel.find({})
    if (taskFlows === null) {
      throw new Error("Can't fetch Flow's contact Devs")
    }
    res.status(200).send({ status: 200, taskFlows })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}
// Update Task Flow

const updateTaskFlow = async (req, res, next) => {
  try {
    TaskProcessModel.findOneAndUpdate(
      {
        applicationTaskFlowUseCase: req.params.applicationTaskFlowUseCase,
      },
      { taskList: req.body.taskList },
      (err, doc) => {
        if (err) throw new Error(err)
        res.status(200).send({ status: 200, message: 'Task Updated' })
      }
    )
  } catch (err) {
    console.log(error.message)
    res.status(400).send({
      status: 400,
      message: error.message,
    })
  }
}

module.exports = {
  createTaskFlow,
  fetchTaskFlow,
  fetchTaskFlows,
  updateTaskFlow,
}
