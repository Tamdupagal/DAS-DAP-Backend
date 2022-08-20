const { issueModel } = require('../../Database/Schemas/SuperAdminConnection')
const ObjectId = require('mongoose').Types.ObjectId
const createIssue = async (req, res, next) => {
  try {
    const { userName, email, bugReport } = req.body
    const newReport = await issueModel.create({
      userName,
      email,
      bugReport,
    })
    res.status(200).send({
      status: 200,
      message: 'Report has been published! Thank you for your feedback.',
    })
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message })
  }
}

const viewIssue = async (req, res, next) => {
  try {
    const { page } = req.query
    let pageNumber = parseInt(page)
    let skip,
      limit = 10,
      query = {}
    if (!pageNumber || pageNumber < 1) pageNumber = 1
    skip = pageNumber * 10 - 10
    const result = await issueModel.find(query).skip(skip).limit(limit)
    if (result.length === 1) {
      res.status(200).send({ status: 200, result: result[0] })
    } else {
      res.status(200).send({ status: 200, result })
    }
  } catch (e) {
    res.status(400 || e.status).send({ status: 400, message: e.message })
  }
}

const updateIssue = async (req, res, next) => {
  try {
    const { issueId } = req.query
    const { isFixed } = req.body
    const query = { _id: ObjectId(issueId) }
    let result = await issueModel.findOneAndUpdate(
      query,
      {
        isFixed,
        fixedOn: new Date().toLocaleDateString(),
      },
      {
        new: true,
      }
    )
    res.status(200).send({
      status: 200,
      message: `Issue with reference-id ${issueId} has been Updated!`,
    })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: e.message,
    })
  }
}

module.exports = { createIssue, viewIssue, updateIssue }
