const crypto = require('crypto')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')

// Create Task Flow

const createTaskFlow = async (req, res) => {
  try {
    const { TaskFlowModel } = res.locals.connection.databaseObject
    let newTask = new TaskFlowModel({
      taskID: crypto.randomBytes(20).toString('hex'),
      applicationID:
        req.body.applicationName + '-' + crypto.randomBytes(2).toString('hex'),
      applicationName: req.body.applicationName,
      applicationURL: req.body.applicationURL,
      applicationFLowURL:
        req.body.applicationURL + '/' + req.body.applicationTaskFlowUseCase,
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
    const { TaskFlowModel } = res.locals.connection.databaseObject

    let taskFlow = await TaskFlowModel.findOne({
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
    const { TaskFlowModel } = res.locals.connection.databaseObject

    let taskFlows = await TaskFlowModel.find({})
    // if (taskFlows === null) {
    //   throw DataBaseError('TaskFlowNull')
    // }
    res.status(200).send({ status: 200, taskFlows })
  } catch (err) {
    console.log(err.message)
    res.status(500).send({
      status: 500,
      message: err.message,
    })
  }
}

const fetchTaskFlowsByApplication = async (req, res, next) => {
  try {
    const { TaskFlowModel } = res.locals.connection.databaseObject
    const { applicationDomain } = req.query
    const taskFlowsByApplication = await TaskFlowModel.aggregate([
      { $match: { applicationDomain: applicationDomain } },
    ])
    console.log(taskFlowsByApplication)
    res.status(200).send({ status: 200, taskFlowsByApplication })
  } catch (e) {
    console.log(e.message)
    res.status(500).send({
      status: 500,
      message: e.message,
    })
  }
}

// Update Task Flow

const updateTaskFlow = async (req, res, next) => {
  try {
    const { TaskFlowModel } = res.locals.connection.databaseObject
    if (!req.params.applicationTaskFlowUseCase)
      throw DataBaseError({
        name: 'TaskFlowNull',
        value: req.params.applicationTaskFlowUseCase,
      })

    let response = await TaskFlowModel.findOneAndUpdate(
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
    const { TaskFlowModel } = res.locals.connection.databaseObject
    if (!req.params.applicationTaskFlowUseCase)
      throw DataBaseError({
        name: 'TaskFlowNull',
        value: req.params.applicationTaskFlowUseCase,
      })
    let response = await TaskFlowModel.findOneAndDelete({
      applicationTaskFlowUseCase: req.params.applicationTaskFlowUseCase,
    })
    if (response === null) {
      throw DataBaseError({
        name: 'TaskFlowNull',
        value: req.params.applicationTaskFlowUseCase,
      })
    }
    res.status(200).send({ status: 200, message: 'TaskFlow has been Deleted!' })
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
  fetchTaskFlowsByApplication,
}
