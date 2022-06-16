const crypto = require('crypto')
// const { AnnouncementResponseModel, AnnouncementModel } =
//   require('../../Database/DatabaseConfig/DBConnection')('DigitalAidedSchools')
const DataBaseError = require('../../Errors/ErrorTypes/DataBaseError')

const createAnnouncement = async (req, res, next) => {
  try {
    const { AnnouncementModel } = res.locals.connection.databaseObject
    const newAnnouncement = await AnnouncementModel.create({
      AnnouncementID: await crypto.randomBytes(20).toString('hex'),
      AnnouncementCreatorName: req.body.AnnouncementCreatorName,
      AnnouncementDate: req.body.AnnouncementDate,
      AnnouncementTitle: req.body.AnnouncementTitle,
      AnnouncementBody: req.body.AnnouncementBody,
      AnnouncementAttachment: req.body.AnnouncementAttachment,
    })
    await newAnnouncement.save()
    res
      .status(200)
      .send({ status: 200, message: 'Announcement has been published!' })
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: "Announcement can't be saved",
    })
  }
}

const viewParticularAnnouncement = async (req, res, next) => {
  const { AnnouncementModel } = res.locals.connection.databaseObject
  try {
    const { AnnouncementID } = req.params
    let announcement = await AnnouncementModel.find({
      AnnouncementID: AnnouncementID,
    })
    res.status(200).send({ status: 200, announcement })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Announcement can't be fetched",
    })
  }
}

const viewAllAnnouncements = async (req, res, next) => {
  const { AnnouncementModel } = res.locals.connection.databaseObject
  try {
    let announcements = await AnnouncementModel.find({})
    res.status(200).send({ status: 200, announcements })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Announcement can't be fetched",
    })
  }
}

const viewParticularAnnouncementResponses = async (req, res, next) => {
  const { AnnouncementResponseModel } = res.locals.connection.databaseObject
  try {
    const { AnnouncementReferenceID } = req.params
    let AnnouncementResponses = await AnnouncementResponseModel.find({
      AnnouncementReferenceID: AnnouncementReferenceID,
    })
    res.status(200).send({ status: 200, AnnouncementResponses })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Announcement Responses can't be fetched",
    })
  }
}

const viewAllAnnouncementResponses = async (req, res, next) => {
  const { AnnouncementResponseModel } = res.locals.connection.databaseObject
  try {
    let AnnouncementResponses = await AnnouncementResponseModel.find({})
    res.status(200).send({ status: 200, AnnouncementResponses })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Announcement Responses can't be fetched",
    })
  }
}

const submitAnnouncementResponse = async (req, res, next) => {
  const { AnnouncementResponseModel } = res.locals.connection.databaseObject
  try {
    const { AnnouncementReferenceID, AnnouncementResponse } = req.body
    const newResponse = await AnnouncementResponseModel.create({
      AnnouncementResponseID: await crypto.randomBytes(20).toString('hex'),
      AnnouncementReferenceID: AnnouncementReferenceID,
      AnnouncementResponse: AnnouncementResponse,
    })
    await newResponse.save()
    res.status(200).send({
      status: 200,
      message: 'Announcement Response has been submitted!',
    })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Announcement Response can't be saved",
    })
  }
}

module.exports = {
  createAnnouncement,
  viewParticularAnnouncement,
  viewAllAnnouncements,
  viewParticularAnnouncementResponses,
  viewAllAnnouncementResponses,
  submitAnnouncementResponse,
}
