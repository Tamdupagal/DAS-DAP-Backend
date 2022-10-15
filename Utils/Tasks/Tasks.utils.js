const Error = require("../../Errors/Error");

// Create Task Flow

const createTaskFlow = async (req, res) => {
  try {
    const { taskFlowModel } = res.locals.connection.databaseObject;
    const {
      applicationName,
      applicationDomain,
      applicationTaskFlowUseCase,
      taskList,
      companyEmail,
    } = req.body;

    const taskFlow = await taskFlowModel.findTaskFlow({
      applicationDomain,
      applicationTaskFlowUseCase,
    });

    if (taskFlow.isExisting)
      throw new Error(
        "ResourceAlreadyExists",
        `${applicationTaskFlowUseCase} in ${applicationDomain} already exists.`,
        "DuplicationError",
        422,
        taskFlow
      );
    const result = await taskFlowModel.createNewTask({
      applicationName,
      applicationDomain,
      applicationTaskFlowUseCase,
      companyEmail,
      taskList,
    });
    if (result.isError) {
      throw new Error(
        "DatabaseError",
        result.message,
        "ServerError",
        500,
        result
      );
    }
    res.status(201).send({
      status: 201,
      message: `Taskflow named ${applicationTaskFlowUseCase} has been published!`,
      result,
    });
  } catch (e) {
    res.status(e.status).send({ message: e.message, reference: e.reference });
  }
};

// Fetch Task Flow

const fetchTaskFlow = async (req, res, next) => {
  try {
    const { taskFlowModel } = res.locals.connection.databaseObject;
    const { applicationTaskFlowUseCase, applicationDomain, page } = req.query;
    let query = {},
      projection = { taskList: 0 },
      skip,
      limit = 10,
      pageNumber = parseInt(page);

    if (applicationTaskFlowUseCase && applicationDomain) {
      query = {
        $and: [{ applicationTaskFlowUseCase }, { applicationDomain }],
      };
      projection = {};
    } else if (applicationDomain) {
      query = { applicationDomain };
    }

    if (!pageNumber || pageNumber <= 1) pageNumber = 1;

    skip = pageNumber * 10 - 10;

    const result = await taskFlowModel
      .find(query, projection)
      .skip(skip)
      .limit(limit);
    res.status(200).send({ status: 200, result, totalCount: result.length });
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};

// Update Task Flow

const updateTaskFlow = async (req, res, next) => {
  try {
    const { taskFlowModel } = res.locals.connection.databaseObject;
    const { applicationTaskFlowUseCase, applicationDomain } = req.query;
    if (!applicationTaskFlowUseCase && !applicationDomain)
      throw new Error(`Testing`);
    let response = await taskFlowModel.findOneAndUpdate(
      {
        applicationTaskFlowUseCase: req.query.applicationTaskFlowUseCase,
      },
      {
        taskList: req.body.taskList,
      },
      {
        new: true,
      }
    );
    if (response === null) {
      throw new Error(`Testing`, "test", "Test", 400);
    }
    res
      .status(200)
      .send({ status: 200, message: "TaskFlow(s) has been Updated!" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};

// Delete Task Flows

const deleteTaskFlow = async (req, res, next) => {
  try {
    const { taskFlowModel } = res.locals.connection.databaseObject;
    const { applicationTaskFlowUseCase, applicationDomain } = req.query;
    let result = await taskFlowModel.findOneAndDelete({
      $and: [{ applicationTaskFlowUseCase, applicationDomain }],
    });
    if (!result) {
      throw new Error(
        "InvalidDeleteRequest",
        `${applicationTaskFlowUseCase} in ${applicationDomain} doesn't exist.`,
        "ResourseDoesNotExist",
        400,
        result
      );
    }
    res.status(200).send({
      status: 200,
      message: `${applicationTaskFlowUseCase} from ${applicationDomain} has been deleted.`,
    });
  } catch (e) {
    res
      .status(e.status)
      .send({ status: e.status, message: e.message, reference: e.reference });
  }
};

const fetchMyTasks = async (req, res, next) => {
  try {
    const { taskFlowModel } = res.locals.connection.databaseObject;

    const { companyEmail } = req.query;
    const response = await taskFlowModel.find({ companyEmail });

    res.status(200).send({
      status: 200,
      result: response.length,
      data: response,
    });
  } catch (e) {
    console.log(e);
    res
      .status(e.status)
      .send({ status: e.status, message: e.message, reference: e.reference });
  }
};

module.exports = {
  createTaskFlow,
  fetchTaskFlow,
  updateTaskFlow,
  deleteTaskFlow,
  fetchMyTasks,
};
