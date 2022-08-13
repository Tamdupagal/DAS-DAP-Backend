const crypto = require('crypto')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')

// Create Task Flow

const createTaskFlow = async (req, res) => {
  try {
    const { TaskFlowModel } = res.locals.connection.databaseObject
    const {
      applicationName,
      applicationUrl,
      applicationDomain,
      applicationTaskFlowUseCase,
      taskList,
    } = req.body
    const taskFlow = await TaskFlowModel.findTaskFlow({
      applicationDomain,
      applicationTaskFlowUseCase,
    })

    if (taskFlow.isExisting)
      throw new Error(
        `${applicationTaskFlowUseCase} in ${applicationDomain} already exists.`
      )
    // let newTask = await TaskFlowModel.create({
    //   applicationID:
    //     applicationName + '-' + crypto.randomBytes(2).toString('hex'),
    //   applicationName,
    //   applicationUrl,
    //   applicationDomain,
    //   applicationFLowURL: applicationUrl + '/' + applicationTaskFlowUseCase,
    //   applicationTaskFlowUseCase,
    //   taskList,
    // })
    res
      .status(201)
      .send({ status: 201, message: 'TaskFlow has been published!' })
  } catch (e) {
    res.status(400).send({ satus: 400, message: e.message })
  }
}

// Fetch Task Flow

const fetchTaskFlow = async (req, res, next) => {
  try {
    const { TaskFlowModel } = res.locals.connection.databaseObject
    const { applicationTaskFlowUseCase, applicationDomain, page } = req.query
    let query = {},
      skip,
      limit = 10,
      pageNumber = parseInt(page)

    if (applicationTaskFlowUseCase && applicationDomain) {
      query = {
        $and: [{ applicationTaskFlowUseCase }, { applicationDomain }],
      }
    }
    if (applicationDomain) {
      query.applicationDomain = applicationDomain
    }
    if (!pageNumber || pageNumber <= 1) pageNumber = 1
    skip = pageNumber * 10 - 10
    let result = await TaskFlowModel.find(query).skip(skip).limit(limit)
    if (
      result.length === 0 &&
      (applicationTaskFlowUseCase || applicationDomain)
    ) {
      throw new Error('No such Entry found')
    }
    res.status(200).send({ status: 200, result })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    })
  }
}

// Update Task Flow

const updateTaskFlow = async (req, res, next) => {
  try {
    const { TaskFlowModel } = res.locals.connection.databaseObject
    if (!req.query.applicationTaskFlowUseCase)
      throw DataBaseError({
        name: 'TaskFlowNull',
        value: req.query.applicationTaskFlowUseCase,
      })

    let response = await TaskFlowModel.findOneAndUpdate(
      {
        applicationTaskFlowUseCase: req.query.applicationTaskFlowUseCase,
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
        value: req.query.applicationTaskFlowUseCase,
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
    const { applicationTaskFlowUseCase, applicationDomain } = req.query
    let result = await TaskFlowModel.findOneAndDelete({
      $and: [{ applicationTaskFlowUseCase, applicationDomain }],
    })
    if (!result)
      throw new Error(
        `${applicationTaskFlowUseCase} in ${applicationDomain} doesn't exist.`
      )
    res.status(200).send({
      status: 200,
      message: `${applicationTaskFlowUseCase} from ${applicationDomain} has been deleted.`,
    })
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message })
  }
}

module.exports = {
  createTaskFlow,
  fetchTaskFlow,
  updateTaskFlow,
  deleteTaskFlow,
}
