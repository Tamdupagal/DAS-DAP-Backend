const crypto = require('crypto')
const {
  feedBackModel,
  feedBackResponseModel,
} = require('../../Database/DatabaseConfig/DBConnection')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')

const createFeedBack = async (req, res, next) => {
  try {
    const newFeedBack = await feedBackModel.create({
      feedBackQuestionID: await crypto.randomBytes(20).toString('hex'),
      feedBackCreatorName: req.body.feedBackCreatorName,
      feedBackQuestions: req.body.feedBackQuestions,
      feedBackQuestionImage: req.body.feedBackQuestionImage,
    })
    await newFeedBack.save()
    res
      .status(200)
      .send({ status: 200, message: 'FeedBack has been published!' })
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "FeedBack can't be saved",
    })
  }
}

const viewParticularFeedBackQuestions = async (req, res, next) => {
  try {
    const { feedBackQuestionID } = req.params
    let feedBackQuestion = await feedBackModel.find({
      feedBackQuestionID: feedBackQuestionID,
    })
    res.status(200).send({ status: 200, feedBackQuestion })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "FeedBack questions can't be fetched",
    })
  }
}

const viewAllFeedBackQuestions = async (req, res, next) => {
  try {
    let FeedBackQuestions = await feedBackModel.find(
      {},
      { feedBackCreatorName: 0 }
    )
    res.status(200).send({ status: 200, FeedBackQuestions })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "FeedBack questions can't be fetched",
    })
  }
}

const viewParticularFeedBackResponses = async (req, res, next) => {
  try {
    const { feedBackQuestionID } = req.params
    let FeedBackResponses = await feedBackResponseModel.find({
      feedBackResponseID: feedBackQuestionID,
    })
    res.status(200).send({ status: 200, FeedBackResponses })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "FeedBack Responses can't be fetched",
    })
  }
}

const viewAllFeedBackResponses = async (req, res, next) => {
  try {
    let FeedBackResponses = await feedBackResponseModel.find({})
    res.status(200).send({ status: 200, FeedBackResponses })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "FeedBack Responses can't be fetched",
    })
  }
}

const submitFeedBackResponse = async (req, res, next) => {
  try {
    const { feedBackQuestionID, UserName, UserType, feedBackResponse } =
      req.body
    const newResponse = await feedBackResponseModel.create({
      feedBackResponseID: await crypto.randomBytes(20).toString('hex'),
      feedBackReferenceID: feedBackQuestionID,
      UserName: UserName,
      UserType: UserType,
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
  viewAllFeedBackQuestions,
  viewAllFeedBackResponses,
  viewParticularFeedBackQuestions,
  viewParticularFeedBackResponses,
  submitFeedBackResponse,
}
