// Create Task Flow

const createTaskFlow = async (req, res) => {
  try {
    const { TaskFlowModel } = res.locals.connection.databaseObject
    const {
      applicationName,
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
    const newTask = await TaskFlowModel.create({
      applicationName,
      applicationDomain,
      applicationTaskFlowUseCase,
      taskList,
    })
    res.status(201).send({
      status: 201,
      message: `Taskflow named ${applicationTaskFlowUseCase} has been published!`,
    })
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
      projection = { taskList: 0 },
      skip,
      limit = 10,
      pageNumber = parseInt(page)

    if (applicationTaskFlowUseCase && applicationDomain) {
      query = {
        $and: [{ applicationTaskFlowUseCase }, { applicationDomain }],
      }
      projection = {}
    } else if (applicationDomain) {
      query = { applicationDomain }
    }

    if (!pageNumber || pageNumber <= 1) pageNumber = 1

    skip = pageNumber * 10 - 10

    const result = await TaskFlowModel.find(query, projection)
      .skip(skip)
      .limit(limit)

    if (
      result.length === 0 &&
      (applicationTaskFlowUseCase || applicationDomain)
    ) {
      throw new Error('No such Entry found')
    }

    if (result.length === 1) {
      res.status(200).send({ status: 200, result: result[0] })
    } else {
      res.status(200).send({ status: 200, result, totalCount: result.length })
    }
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
    const { applicationTaskFlowUseCase, applicationDomain } = req.query
    if (!applicationTaskFlowUseCase && !applicationDomain)
      throw new Error(`Testing`)
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
      throw new Error(`Testing`)
    }
    res
      .status(200)
      .send({ status: 200, message: 'TaskFlow(s) has been Updated!' })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({
      status: 400,
      message: e.message,
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
