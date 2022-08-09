const crypto = require('crypto')
const ObjectID = require('mongoose').Types.ObjectId
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')

const createFeedBack = async (req, res, next) => {
  try {
    const { feedBackModel } = res.locals.connection.databaseObject
    const { feedBackCreatorName, feedBackQuestions, feedBackQuestionImage } =
      req.body
    const newFeedBack = await feedBackModel.create({
      feedBackCreatorName,
      feedBackQuestions,
      feedBackQuestionImage,
    })
    res
      .status(200)
      .send({ status: 200, message: 'FeedBack has been published!' })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 400,
      message: "FeedBack can't be saved",
    })
  }
}

const viewFeedBackQuestions = async (req, res, next) => {
  try {
    const { feedBackModel } = res.locals.connection.databaseObject
    const { feedBackID, page } = req.query
    let query = {},
      limit,
      skip,
      pageNumber = parseInt(page),
      totalCount
    if (feedBackID) query._id = ObjectID(feedBackID)
    if (!pageNumber || pageNumber <= 1) pageNumber = 1
    limit = 10
    skip = pageNumber * 10 - 10
    totalCount = await feedBackModel.count()
    let result = await feedBackModel.find(query).limit(limit).skip(skip)
    res.status(200).send({ status: 200, result, totalCount })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({
      status: 400,
      message: "FeedBack questions can't be fetched",
    })
  }
}

const viewFeedBackResponses = async (req, res, next) => {
  try {
    const { feedBackResponseModel, UserModel } =
      res.locals.connection.databaseObject
    const { feedBackID, page, userId } = req.query
    let query = {},
      pageNumber,
      limit,
      skip
    if (feedBackID) query.feedBackReferenceID = feedBackID
    if (userId && feedBackID) {
      let user = await UserModel.find({
        _id: ObjectID(userId),
      })
      query.email = user.email
    }
    if (!page || page <= 1) pageNumber = 1
    limit = 10
    skip = pageNumber * 10 - 10
    let totalCount = await feedBackResponseModel.count()
    let result = await feedBackResponseModel.find(query).limit(limit).skip(skip)
    res.status(200).send({ status: 200, result, totalCount })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({
      status: 400,
      message: "FeedBack Responses can't be fetched",
    })
  }
}

const submitFeedBackResponse = async (req, res, next) => {
  try {
    const { feedBackResponseModel } = res.locals.connection.databaseObject
    const { feedBackID, email, userType, feedBackResponse } = req.body
    const newResponse = await feedBackResponseModel.create({
      feedBackReferenceID: feedBackID,
      email: email,
      userType: userType,
      feedBackResponse: feedBackResponse,
    })
    await newResponse.save()
    res
      .status(200)
      .send({ status: 200, message: 'Response has been submitted!' })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "FeedBack Response can't be saved",
    })
  }
}

module.exports = {
  createFeedBack,
  viewFeedBackQuestions,
  viewFeedBackResponses,
  submitFeedBackResponse,
}
