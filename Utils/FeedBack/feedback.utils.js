const {
  SuperAdminFeedback,
} = require("../../Database/Schemas/SuperAdminConnection");

const ObjectID = require("mongoose").Types.ObjectId;

const createFeedBack = async (req, res, next) => {
  try {
    const { feedBackModel } = res.locals.connection.databaseObject;
    const { email, rating, feedbackQuery } = req.body;
    // const newFeedBack = await feedBackModel.create({
    //   email, rating, feedbackQuery
    // })

    const newFeedBack = await feedBackModel.findOneAndUpdate(
      {
        email,
      },
      { email, rating, feedbackQuery },
      { new: true, upsert: true }
    );
    res
      .status(200)
      .send({ status: 200, message: "FeedBack has been published!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: "FeedBack can't be saved",
    });
  }
};

const viewFeedBackQuestions = async (req, res, next) => {
  try {
    const { feedBackModel } = res.locals.connection.databaseObject;
    const { feedBackID, page } = req.query;
    let query = {},
      limit,
      skip,
      pageNumber = parseInt(page),
      totalCount;
    if (feedBackID) query._id = ObjectID(feedBackID);
    if (!pageNumber || pageNumber <= 1) pageNumber = 1;
    limit = 10;
    skip = pageNumber * 10 - 10;
    totalCount = await feedBackModel.count();
    let result = await feedBackModel.find(query).limit(limit).skip(skip);
    if (result.length !== 1) {
      res.status(200).send({ status: 200, result, totalCount });
    } else {
      res.status(200).send({ status: 200, result: result[0], totalCount });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      status: 400,
      message: e.message,
    });
  }
};

const viewFeedBackResponses = async (req, res, next) => {
  try {
    const { feedBackResponseModel, UserModel } =
      res.locals.connection.databaseObject;
    const { feedbackId, page, email } = req.query;
    let query = {},
      pageNumber,
      limit,
      skip;
    if (feedbackId) query.feedbackReferenceId = feedbackId;
    if (email && feedbackId) {
      query.email = email;
    }
    if (!page || page <= 1) pageNumber = 1;
    limit = 10;
    skip = pageNumber * 10 - 10;
    console.log(query);
    let totalCount = await feedBackResponseModel.count();
    let result = await feedBackResponseModel
      .find(query)
      .limit(limit)
      .skip(skip);
    if (result.length !== 1) {
      res.status(200).send({ status: 200, result, totalCount });
    } else {
      res.status(200).send({ status: 200, result: result[0], totalCount });
    }
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      status: 400,
      message: "FeedBack Responses can't be fetched",
    });
  }
};

const submitFeedBackResponse = async (req, res, next) => {
  try {
    const { feedBackResponseModel } = res.locals.connection.databaseObject;
    const { feedbackId, email, userType, feedbackResponse } = req.body;
    const newResponse = await feedBackResponseModel.create({
      feedbackReferenceId: feedbackId,
      email,
      userType,
      feedbackResponse,
    });
    res
      .status(200)
      .send({ status: 200, message: "Response has been submitted!" });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({
      status: 400,
      message: "FeedBack Response can't be saved",
    });
  }
};

const createUserFeedBack = async (req, res, next) => {
  try {
    const { UserFeedBackModel } = res.locals.connection.databaseObject;
    const { userEmail, userQuery, userQueryDescription } = req.body;

    const data = await UserFeedBackModel.find({ userQuery });
    if (data.length > 0 && data) {
      throw new Error("query is already exist");
    }

    const newResponse = await UserFeedBackModel.create({
      userEmail,
      userQuery,
      userQueryDescription,
    });
    res
      .status(200)
      .send({
        status: 200,
        message: "Response has been submitted!",
        data: newResponse,
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: error.message || "FeedBack Response can't be saved",
    });
  }
};

const getUserFeedBack = async (req, res, next) => {
  try {
    const { UserFeedBackModel } = res.locals.connection.databaseObject;
    const { userEmail } = req.query;

    const newResponse = await UserFeedBackModel.find({ userEmail });

    res
      .status(200)
      .send({ status: 200, result: newResponse.length, data: newResponse });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: "FeedBack can't be Viewed Please Try Again",
    });
  }
};

const updateUserFeedBack = async (req, res, next) => {
  try {
    const { UserFeedBackModel } = res.locals.connection.databaseObject;
    const { id } = req.params;
    const { userQuery, userQueryDescription} = req.body;

   const userFeedback =  await UserFeedBackModel.findByIdAndUpdate(id, {
      userQuery,
    });

    if(userQueryDescription)
    userQueryDescription.map((data)=>{userFeedback.userQueryDescription.push(data)})
    await userFeedback.save();

    res
      .status(200)
      .send({ status: 200, message: "FeedBack Has Been Updated!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: error.message || "FeedBack can't be Updated!",
    });
  }
};

const deleteUserFeedBack = async (req, res, next) => {
  try {
    const { UserFeedBackModel } = res.locals.connection.databaseObject;
    const { id } = req.params;
    await UserFeedBackModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ status: 200, message: "FeedBack Has Been Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: "FeedBack can't be Deleted!",
    });
  }
};

const searchFeedback = async (req, res, next) => {
  try {
    const { UserFeedBackModel } = res.locals.connection.databaseObject;
    const { text, email } = req.query;

    const response = await UserFeedBackModel.find({
      $text: { $search: text },
      userEmail: email,
    });

    res
      .status(200)
      .send({ status: 200, result: response.length, data: response });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: "SOME ERROR OCCURED",
    });
  }
};

const createSuperAdminFeedBack = async (req, res, next) => {
  try {
    const { userEmail, userQuery, userQueryDescription } = req.body;

    const data = await SuperAdminFeedback.find({ userQuery });
    if (data.length > 0 && data) {
      throw new Error("query is already exist");
    }

    const newResponse = await SuperAdminFeedback.create({
      userEmail,
      userQuery,
      userQueryDescription,
    });
    res
      .status(200)
      .send({
        status: 200,
        message: "Response has been submitted!",
        data: newResponse,
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: error.message || "FeedBack Response can't be saved",
    });
  }
};

const getSuperAdminFeedBack = async (req, res, next) => {
  try {
    const { userEmail } = req.query;

    const newResponse = await SuperAdminFeedback.find({ userEmail });

    res
      .status(200)
      .send({ status: 200, result: newResponse.length, data: newResponse });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: "FeedBack can't be Viewed Please Try Again",
    });
  }
};

const updateSuperAdminFeedBack = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userQuery, userQueryDescription} = req.body;

   const superAdminFeedback = await SuperAdminFeedback.findByIdAndUpdate(id, {
      userQuery,
    });
   
    if(userQueryDescription)
    userQueryDescription.map((data)=>{superAdminFeedback.userQueryDescription.push(data)})
    await superAdminFeedback.save();
    res
      .status(200)
      .send({ status: 200, message: "FeedBack Has Been Updated!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: error.message || "FeedBack can't be Updated!",
    });
  }
};

const deleteSuperAdminFeedBack = async (req, res, next) => {
  try {
    const { id } = req.params;
    await SuperAdminFeedback.findByIdAndDelete(id);
    res
      .status(200)
      .send({ status: 200, message: "FeedBack Has Been Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: "FeedBack can't be Deleted!",
    });
  }
};

module.exports = {
  createFeedBack,
  viewFeedBackQuestions,
  viewFeedBackResponses,
  submitFeedBackResponse,
  createUserFeedBack,
  getUserFeedBack,
  updateUserFeedBack,
  deleteUserFeedBack,
  searchFeedback,
  createSuperAdminFeedBack,
  getSuperAdminFeedBack,
  updateSuperAdminFeedBack,
  deleteSuperAdminFeedBack,
};
