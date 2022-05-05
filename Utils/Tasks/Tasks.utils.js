const crypto = require('crypto')
const TaskProcessModel = require('../../Database/Models/TaskProcessModel')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')

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
        (await req.body.applicationTaskFlowUseCase),
      applicationTaskFlowUseCase: req.body.applicationTaskFlowUseCase,
      taskList: req.body.taskList,
    })
    await newTask.save()
    res
      .status(200)
      .send({ status: 200, message: 'TaskFlow has been published!' })
  } catch (error) {
    let ErrorResponse = DataBaseError(error)
    console.log(ErrorResponse.errMessage)
    res.status(ErrorResponse.errStatusCode).send({
      status: ErrorResponse.errStatusCode,
      message: ErrorResponse.errMessage,
    })
  }
}

// Fetch Task Flow

const fetchTaskFlow = async (req, res, next) => {
  try {
    let taskFlow = await TaskProcessModel.findOne({
      applicationTaskFlowUseCase: req.params.applicationTaskFlowUseCase,
    })
    if (taskFlow === null) {
      throw DataBaseError({
        name: 'TaskFlowNull',
        value: req.params.applicationTaskFlowUseCase,
      })
    }
    res.status(200).send({ status: 200, taskFlow })
  } catch (err) {
    console.log(err.errMessage)
    res.status(err.errStatusCode).send({
      status: err.errStatusCode,
      message: err.errMessage,
    })
  }
}

const fetchTaskFlows = async (req, res, next) => {
  try {
    let taskFlows = await TaskProcessModel.find({})
    // if (taskFlows === null) {
    //   throw DataBaseError('TaskFlowNull')
    // }
    res.status(200).send({ status: 200, taskFlows })
  } catch (err) {
    console.log(err.errMessage)
    res.status(err.errStatusCode).send({
      status: err.errStatusCode,
      message: err.errMessage,
    })
  }
}
// Update Task Flow

const updateTaskFlow = async (req, res, next) => {
  try {
    if (!req.params.applicationTaskFlowUseCase)
      throw DataBaseError({
        name: 'TaskFlowNull',
        value: req.params.applicationTaskFlowUseCase,
      })

    let response = await TaskProcessModel.findOneAndUpdate(
      {
        applicationTaskFlowUseCase: req.params.applicationTaskFlowUseCase,
      },
      {
        taskList: req.body.taskList,
      },
      {
        new: true,
      }
    )
    if (response === null) {
      throw DataBaseError({
        name: 'TaskFlowNull',
        value: req.params.applicationTaskFlowUseCase,
      })
    }
    res
      .status(200)
      .send({ status: 200, message: 'TaskFlow(s) has been Updated!' })
  } catch (err) {
    console.log(err.errMessage)
    res.status(err.errStatusCode).send({
      status: err.errStatusCode,
      message: err.errMessage,
    })
  }
}

// Delete Task Flows

const deleteTaskFlow = async (req, res, next) => {
  try {
    let TaskFlowUseCaseArray = req.body.TaskFlowUseCaseArray
    if (!TaskFlowUseCaseArray)
      throw DataBaseError({
        name: 'TaskFlowUseCaseArrayNull',
      })
    for (const TaskFlowUseCase of TaskFlowUseCaseArray.values()) {
      let response = await TaskProcessModel.findOneAndDelete({
        applicationTaskFlowUseCase: TaskFlowUseCase,
      })
      if (response === null) {
        throw DataBaseError({
          name: 'TaskFlowNull',
          value: TaskFlowUseCase,
        })
      }
    }
    res
      .status(200)
      .send({ status: 200, message: 'TaskFlow(s) has been Deleted!' })
  } catch (err) {
    console.log(err.errMessage)
    res.status(err.errStatusCode).send({
      status: err.errStatusCode,
      message: err.errMessage,
    })
  }
}

module.exports = {
  createTaskFlow,
  fetchTaskFlow,
  fetchTaskFlows,
  updateTaskFlow,
  deleteTaskFlow,
}
