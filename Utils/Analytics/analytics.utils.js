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
      timeTaken
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
      timeTaken
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

    let query = { companyEmail },
      projection = { analyticsList: 0 },
      skip,
      limit = 10,
      pageNumber = parseInt(page);
    if (!pageNumber || pageNumber <= 1) pageNumber = 1;

    skip = pageNumber * 10 - 10;

    const totalCount = await analyticsModel.find({ companyEmail });

    const response = await analyticsModel
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
    res.status(e.status).send({ status: e.status, message: e.message });
  }
};

const pushTaskAnalytics = async (req, res, next) => {
  try {
    const {
      taskId,
      completedBy,
      taskAssignedAt,
      taskCompletedAt,

    } = req.body;
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
      taskId, completedBy, taskAssignedAt, taskCompletedAt, timeTaken:result
    }

    await taskAnalyticsModel.findOneAndUpdate(
      { taskId },
      newObj,
      { new: true, upsert: true }
    );
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
    const { taskAnalyticsModel } = res.locals.connection.databaseObject;
    const response = await taskAnalyticsModel.find({}).populate({
      path: "taskId",
      populate: [
        { path: "assignedBy", select: ["email", "typeOfUser", "userName"] },
        { path: "assignedTo", select: ["email", "typeOfUser", "userName"] },
      ],
      select: ["assignedAt", "title", "assignedTo", "startDate", "endDate"],
    });
    res.status(200).send({
      status: 200,
      result: response.length,
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
};
