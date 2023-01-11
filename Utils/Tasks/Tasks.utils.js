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

    const {
      applicationTaskFlowUseCase,
      applicationDomain,
      page,
      companyEmail,
    } = req.query;

    let query = {},
      projection = { taskList: 0 },
      skip,
      limit = 8,
      pageNumber = parseInt(page);

    if (applicationTaskFlowUseCase && applicationDomain) {
      query = {
        $and: [
          { applicationTaskFlowUseCase },
          { applicationDomain },
          { companyEmail },
        ],
      };
      projection = {};
    } else if (applicationDomain) {
      query = { $and: [{ applicationDomain }, { companyEmail }] };
    }

    if (!pageNumber || pageNumber <= 1) pageNumber = 1;

    skip = pageNumber * 8 - 8;
    const totalCount = await taskFlowModel.find(query);

    const result = await taskFlowModel
      .find(query, projection)
      .skip(skip)
      .limit(limit);
    res
      .status(200)
      .send({ status: 200, result, totalCount: totalCount.length });
  } catch (e) {
    totalCount;
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

    const { companyEmail, page } = req.query;
    let query = { companyEmail },
      projection = { taskList: 0 },
      skip,
      limit = 8,
      pageNumber = parseInt(page);
    if (!pageNumber || pageNumber <= 1) pageNumber = 1;

    skip = pageNumber * 8 - 8;

    const totalCount = await taskFlowModel.find({ companyEmail });
    const response = await taskFlowModel
      .find(query, projection)
      .skip(skip)
      .limit(limit);

    res.status(200).send({
      status: 200,
      result: response.length,

      totalCount: totalCount.length,

      data: response,
    });
  } catch (e) {
    console.log(e);
    res
      .status(e.status)
      .send({ status: e.status, message: e.message, reference: e.reference });
  }
};

const createTask = async (req, res, next) => {
  try {
    const {
      title,
      description,
      list,
      label,
      priorities,
      assignedBy,
      assignedTo,
      startDate,
      endDate,
      checkList,
    } = req.body;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    console.log(startDate.split(",")[0]);

    const date = new Date()
      .toLocaleDateString()
      .split("/")
      .map((data) => Number(data));
    const time = new Date()
      .toLocaleTimeString("en-in", { hour12: false })
      .split(":")
      .map((data) => Number(data));
    const startDateCheck = startDate
      .split(",")[0]
      .split("/")
      .map((data) => Number(data));
    const startTimeCheck = startDate
      .split(" ,")[1]
      .split(":")
      .map((data) => Number(data));
    const endDateCheck = endDate
      .split(",")[0]
      .split("/")
      .map((data) => Number(data));
    const endTimeCheck = endDate
      .split(",")[1]
      .split(":")
      .map((data) => Number(data));

    if (date[2] > startDateCheck[2]) {
      throw new Error(
        "please select current year or greater than current year"
      );
    } else if (date[2] == startDateCheck[2] && date[1] > startDateCheck[1]) {
      throw new Error(
        "please select current month or greater than current month"
      );
    } else if (
      date[2] == startDateCheck[2] &&
      date[1] == startDateCheck[1] &&
      date[0] > startDateCheck[0]
    ) {
      throw new Error("please select current day or greater than current day");
    } else if (
      date[2] == startDateCheck[2] &&
      date[1] == startDateCheck[1] &&
      date[0] == startDateCheck[0] &&
      time[0] > startTimeCheck[0]
    ) {
      throw new Error(
        "please select current hour or greater than current hour"
      );
    } else if (
      date[2] == startDateCheck[2] &&
      date[1] == startDateCheck[1] &&
      date[0] == startDateCheck[0] &&
      time[0] == startTimeCheck[0] &&
      time[1] > startTimeCheck[1]
    ) {
      throw new Error(
        "please select current minute or greater than current minute"
      );
    } else if (startDateCheck[2] > endDateCheck[2]) {
      throw new Error(
        "please select current year or greater than current year"
      );
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] > endDateCheck[1]
    ) {
      throw new Error(
        "please select current month or greater than current month"
      );
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] == endDateCheck[1] &&
      startDateCheck[0] > endDateCheck[0]
    ) {
      throw new Error("please select current day or greater than current day");
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] == endDateCheck[1] &&
      startDateCheck[0] == endDateCheck[0] &&
      startTimeCheck[0] > endTimeCheck[0]
    ) {
      throw new Error(
        "please select current hour or greater than current hour"
      );
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] == endDateCheck[1] &&
      startDateCheck[0] == endDateCheck[0] &&
      startTimeCheck[0] == endTimeCheck[0] &&
      startTimeCheck[1] > endTimeCheck[1]
    ) {
      throw new Error(
        "please select current minute or greater than current minute"
      );
    }
    await taskManagementModel.create({
      title,
      description,
      list,
      label,
      priorities,
      assignedBy,
      assignedTo,
      startDate: new Date(
        `${startDateCheck[1]}/${startDateCheck[0]}/${startDateCheck[2]} , ${startTimeCheck[0]}:${startTimeCheck[1]}`
      ),
      endDate: new Date(
        `${endDateCheck[1]}/${endDateCheck[0]}/${endDateCheck[2]} , ${endTimeCheck[0]}:${endTimeCheck[1]}`
      ),
      checkList,
    });

    res.status(201).send({
      status: 201,
      message: "Task created successFully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(404).send({
        status: 404,
        message: Object.values(error.errors)
          .map((el) => el.message)
          .toString(),
      });
    }
    res.status(404).send({
      status: 404,
      message: error.message || error.name || "Some Error Occured!",
    });
  }
};

const getTask = async (req, res, next) => {
  try {
    const { assignedBy, assignedTo } = req.query;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    const response = await taskManagementModel
      .find({ $or: [{ assignedBy }, { assignedTo }] })
      .populate({
        path: "assignedBy",
        select: ["email", "typeOfUser", "userName"],
      })
      .populate({
        path: "assignedTo",
        select: ["email", "typeOfUser", "userName"],
      });
    let set = new Set();
    for (let i in response) {
      for (let j in response[i].label) set.add(response[i].label[j].toLowerCase().trim());
    }
    res.status(200).send({
      status: 200,
      result: response.length,
      allLabels: [...set],
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    await taskManagementModel.findByIdAndDelete(id);
    res.status(202).send({
      status: 202,
      message: "Task Deleted SuccessFully!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

const UpdatestarredTasks = async (req, res, next) => {
  try {
    const { taskId, userId } = req.body;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    const task = await taskManagementModel.findById(taskId);
    const userTask = task.starred.filter((data) => data.userId == userId);
    if (userTask.length) {
      for (let i in task.starred) {
        if (task.starred[i].userId == userId) {
          task.starred[i].isStarred = !task.starred[i].isStarred;
          break;
        }
      }
    } else {
      task.starred.push({ userId, isStarred: true });
    }
    await task.save();
    res.status(202).send({
      status: 202,
      message: "Task Updated SuccessFully!",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

const getStarredTasks = async (req, res, next) => {
  try {
    const { userId, isStarred } = req.query;
    const { taskManagementModel } = res.locals.connection.databaseObject;

    const response = await taskManagementModel
      .find({ starred: { $elemMatch: { userId, isStarred } } })
      .populate({
        path: "assignedBy",
        select: ["email", "typeOfUser", "userName"],
      })
      .populate({
        path: "assignedTo",
        select: ["email", "typeOfUser", "userName"],
      });
    res.status(200).send({
      status: 200,
      result: response.length,
      data: response,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      list,
      label,
      priorities,
      assignedBy,
      assignedTo,
      startDate,
      endDate,
      checkList,
    } = req.body;

    const { taskManagementModel } = res.locals.connection.databaseObject;

    const date = new Date()
      .toLocaleDateString()
      .split("/")
      .map((data) => Number(data));
    const time = new Date()
      .toLocaleTimeString("en-in", { hour12: false })
      .split(":")
      .map((data) => Number(data));
    const startDateCheck = startDate
      .split(",")[0]
      .split("/")
      .map((data) => Number(data));
    const startTimeCheck = startDate
      .split(" ,")[1]
      .split(":")
      .map((data) => Number(data));
    const endDateCheck = endDate
      .split(",")[0]
      .split("/")
      .map((data) => Number(data));
    const endTimeCheck = endDate
      .split(",")[1]
      .split(":")
      .map((data) => Number(data));

  if (startDateCheck[2] > endDateCheck[2]) {
      throw new Error(
        "please select current year or greater than current year"
      );
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] > endDateCheck[1]
    ) {
      throw new Error(
        "please select current month or greater than current month"
      );
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] == endDateCheck[1] &&
      startDateCheck[0] > endDateCheck[0]
    ) {
      throw new Error("please select current day or greater than current day");
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] == endDateCheck[1] &&
      startDateCheck[0] == endDateCheck[0] &&
      startTimeCheck[0] > endTimeCheck[0]
    ) {
      throw new Error(
        "please select current hour or greater than current hour"
      );
    } else if (
      startDateCheck[2] == endDateCheck[2] &&
      startDateCheck[1] == endDateCheck[1] &&
      startDateCheck[0] == endDateCheck[0] &&
      startTimeCheck[0] == endTimeCheck[0] &&
      startTimeCheck[1] > endTimeCheck[1]
    ) {
      throw new Error(
        "please select current minute or greater than current minute"
      );
    }

    const updatedObj = {
      title,
      description,
      list,
      label,
      priorities,
      assignedBy,
      assignedTo,
      startDate: new Date(
        `${startDateCheck[1]}/${startDateCheck[0]}/${startDateCheck[2]} , ${startTimeCheck[0]}:${startTimeCheck[1]}`
      ),
      endDate: new Date(
        `${endDateCheck[1]}/${endDateCheck[0]}/${endDateCheck[2]} , ${endTimeCheck[0]}:${endTimeCheck[1]}`
      ),
      checkList,
    };

    await taskManagementModel.findByIdAndUpdate(id, updatedObj, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.status(201).send({
      status: 201,
      message: "Task Updated SuccessFully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(404).send({
        status: 404,
        message: Object.values(error.errors)
          .map((el) => el.message)
          .toString(),
      });
    }
    res.status(404).send({
      status: 404,
      message: error.message || error.name || "Some Error Occured!",
    });
  }
};

const getCompletedTask = async (req, res, next) => {
  try {
    const { assignedBy, assignedTo } = req.query;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    const myTask = await taskManagementModel
      .find({ $or: [{ assignedBy }, { assignedTo }] })
      .populate({
        path: "assignedBy",
        select: ["email", "typeOfUser", "userName"],
      })
      .populate({
        path: "assignedTo",
        select: ["email", "typeOfUser", "userName"],
      });
    const completedTask = myTask.filter((data) => data.list == "Done");
    res.status(200).send({
      status: 200,
      result: completedTask.length,
      data: completedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

const getLabeledTask = async (req, res, next) => {
  try {
    const { assignedBy, assignedTo, label } = req.query;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    const myTask = await taskManagementModel
      .find({ $or: [{ assignedBy }, { assignedTo }] })
      .populate({
        path: "assignedBy",
        select: ["email", "typeOfUser", "userName"],
      })
      .populate({
        path: "assignedTo",
        select: ["email", "typeOfUser", "userName"],
      });
    const labeledTask = myTask.filter((data) => data.label.includes(label));
    res.status(200).send({
      status: 200,
      result: labeledTask.length,
      data: labeledTask,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

const assignedByMeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    const response = await taskManagementModel
      .find({ assignedBy: id })
      .populate({
        path: "assignedBy",
        select: ["email", "typeOfUser", "userName"],
      })
      .populate({
        path: "assignedTo",
        select: ["email", "typeOfUser", "userName"],
      });
    res.status(200).send({
      status: 200,
      result: response.length,
      data: response,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

const assignedToMeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { taskManagementModel } = res.locals.connection.databaseObject;
    const response = await taskManagementModel
      .find({ assignedTo: { _id: id } })
      .populate({
        path: "assignedBy",
        select: ["email", "typeOfUser", "userName"],
      })
      .populate({
        path: "assignedTo",
        select: ["email", "typeOfUser", "userName"],
      });
    res.status(200).send({
      status: 200,
      result: response.length,
      data: response,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

module.exports = {
  createTaskFlow,
  fetchTaskFlow,
  updateTaskFlow,
  deleteTaskFlow,
  createTask,
  fetchMyTasks,
  updateTask,
  getTask,
  deleteTask,
  UpdatestarredTasks,
  getStarredTasks,
  getCompletedTask,
  getLabeledTask,
  assignedByMeTask,
  assignedToMeTask,
};
