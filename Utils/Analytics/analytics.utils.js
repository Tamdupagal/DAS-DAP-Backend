const Error = require("../../Errors/Error");
const dateDiffer = require("date-differ");
 
const pushAnalytics = async (req, res, next) => {
  try {
    const {
      applicationTaskFlowUseCase,
      applicationDomain,
      isCompleted,
      isAborted,
      userEmail,
      companyEmail,
      timeStampStartByUsers,
      timeStampCompletedByUsers,
      timeTaken,
    } = req.body;
    // const { email } = req.query
    // console.log(req.body)
    const { analyticsModel } = res.locals.connection.databaseObject;
    // let user = await userModel.findUser({ email })
    // if (!user.isExisting) {
    //   throw new Error(
    //     'UserNA',
    //     'No such user exists!',
    //     'Availability Error',
    //     404
    //   )
    // }
    let query = {
      applicationTaskFlowUseCase,
      applicationDomain,
      userEmail,
      companyEmail,
      timeStampStartByUsers,
      timeStampCompletedByUsers,
      timeTaken,
    };
    if (isCompleted) query.isCompleted = isCompleted;
    if (isAborted) query.isAborted = isAborted;
    let result = await analyticsModel.updateAnalytics(query);
    if (!result.isUpdated) {
      throw new Error(
        "Server Error",
        "Updation Not Possible,Please contact Support! ",
        "",
        500
      );
    }
    res.status(200).send({ status: 200, message: result.message });
  } catch (e) {
    res.status(e.status).send({ status: e.status, message: e.message });
  }
};

const getAllAnalytics = async (req, res, next) => {
  try {
    const { companyEmail, page } = req.query;
    const { analyticsModel } = res.locals.connection.databaseObject;
    if (page == -1) {
      const response = await analyticsModel.find({ companyEmail });
      res.status(200).send({
        status: 200,
        result: response.length,
        totalCount: response.length,
        data: response,
      });
    }

    let query = { companyEmail },
      projection = { analyticsList: 0 },
      skip,
      limit = 10,
      pageNumber = parseInt(page);
    if (!pageNumber || pageNumber <= 1) pageNumber = 1;

    skip = pageNumber * 10 - 10;

    const totalCount = await analyticsModel.find({ companyEmail });
    let totalCountNumber = 0;
    totalCount.map((flow) => {
      return (totalCountNumber += flow.timesCompletedByUsers);
    });

    const response = await analyticsModel
      .find(query, projection)
      .skip(skip)
      .limit(limit);
    res.status(200).send({
      status: 200,
      result: response.length,
      totalCount: totalCount.length,
      totalFlowsShown: totalCountNumber,
      data: response,
    });
  } catch (e) {
    res.status(e.status).send({ status: e.status, message: e.message });
  }
};

const getAllAnalyticss = async (req, res, next) => {
  try {
    const { companyEmail } = req.query;
    const { analyticsModel } = res.locals.connection.databaseObject;

    const response = await analyticsModel.find({ companyEmail });

    const totalCount = response.length;
    let totalCountNumber = 0;
    response.forEach((flow) => {
      totalCountNumber += flow.timesCompletedByUsers;
    });

    res.status(200).send({
      status: 200,
      result: response.length,
      totalCount: totalCount,
      totalFlowsShown: totalCountNumber,
      data: response,
    });
  } catch (e) {
    res.status(e.status).send({ status: e.status, message: e.message });
  }
};


const pushTaskAnalytics = async (req, res, next) => {
  try {
    const { taskId, completedBy, taskAssignedAt, taskCompletedAt } = req.body;
    const { taskAnalyticsModel } = res.locals.connection.databaseObject;

    let result = "";
    const date1 = new Date(taskAssignedAt);
    const date2 = new Date(taskCompletedAt);
    let diffTime = Math.abs(date2 - date1) / 1000 / 60 / 60;
    if (diffTime < 24) {
      result = diffTime + " hours";
    } else {
      result = dateDiffer({
        from: date1,
        to: date2,
      });
    }
    const newObj = {
      taskId,
      completedBy,
      taskAssignedAt,
      taskCompletedAt,
      timeTaken: result,
    };

    await taskAnalyticsModel.findOneAndUpdate({ taskId }, newObj, {
      new: true,
      upsert: true,
    });
    res.status(201).send({
      status: 201,
      response: "Task Analytics Created/Updated Succesfully!",
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

const getTaskAnalytics = async (req, res, next) => {
  try {
    const { page } = req.query;
    const { taskAnalyticsModel } = res.locals.connection.databaseObject;
    let query = {},
      projection = { TaskAnalyticsList: 0 },
      skip,
      limit = 10,
      pageNumber = parseInt(page);
    if (!pageNumber || pageNumber <= 1) pageNumber = 1;

    skip = pageNumber * 10 - 10;

    const totalCount = await taskAnalyticsModel.find({});

    const response = await taskAnalyticsModel
      .find(query, projection)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "taskId",
        populate: [
          { path: "assignedBy", select: ["email", "typeOfUser", "userName"] },
          { path: "assignedTo", select: ["email", "typeOfUser", "userName"] },
        ],
        select: ["assignedAt", "title", "assignedTo", "startDate", "endDate"],
      });
    res.status(200).send({
      status: 200,
      result: totalCount.length,
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({ status: 404, message: "Some Error Occured!" });
  }
};

module.exports = {
  pushAnalytics,
  getAllAnalytics,
  getTaskAnalytics,
  pushTaskAnalytics,
  getAllAnalyticss,
};
