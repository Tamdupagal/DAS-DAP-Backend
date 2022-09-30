const ObjectId = require('mongoose').Types.ObjectId

// Create New Announcement MiddleWare
const createAnnouncement = async (req, res, next) => {
  try {
    const { AnnouncementModel } = res.locals.connection.databaseObject
    const {
      announcementCreatorName,
      announcementDate,
      announcementTitle,
      announcementBody,
      announcementAttachment,
      announcementReceivers,
      announcerEmail
    } = req.body
    console.log(res.locals.connection.databaseObject)
    const newAnnouncement = await AnnouncementModel.create({
      announcementCreatorName,
      announcementDate,
      announcementTitle,
      announcementBody,
      announcementAttachment,
      announcementReceivers,
      announcerEmail
    })
    res
      .status(200)
      .send({ status: 200, message: 'Announcement has been published!',data:newAnnouncement })
  } catch (error) {
    console.log(error.message)
    res.status(400).send({
      status: 400,
      message: "Announcement can't be saved",
    })
  }
}

// view announcements

const viewAnnouncements = async (req, res, next) => {
  try {
    const { AnnouncementModel, UserModel } =
      res.locals.connection.databaseObject
    const { announcementID, userId } = req.query
    let page = parseInt(req.query.page)
    let result,
      totalAnnouncementCount,
      query = []
    if (announcementID) {
      query.push({ $match: { _id: ObjectId(announcementID) } })
    } else if (userId) {
      const user = await UserModel.findById(
        { _id: userId },
        { password: 0, userName: 0 }
      )
      query.push(
        { $unwind: '$AnnouncementReceivers' },
        {
          $match: {
            'AnnouncementReceivers.email': user.email,
          },
        }
      )
    } else {
      if (!page || page <= 1) page = 1
      totalAnnouncementCount = await AnnouncementModel.count()
      query.push({ $limit: 10 }, { $skip: page * 10 - 10 })
    }
    result = await AnnouncementModel.aggregate(query)
    res.status(200).send({ status: 200, result, totalAnnouncementCount })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Announcement can't be fetched",
    })
  }
}

// View announcements responses MiddleWare

const viewAnnouncementResponse = async (req, res, next) => {
  try {
    const { AnnouncementResponseModel, UserModel } =
      res.locals.connection.databaseObject
    const { page, announcementResponseID, userId } = req.query
    let result, totalAnnouncementResponseCount
    let pageNumber = parseInt(page)
    let query = {},
      limit,
      skip
    if (announcementResponseID) query._id = announcementResponseID
    if (userId) {
      let user = await UserModel.find({ _id: ObjectId(userId) })
      query.AnnouncementResponse.email = user.email
    }
    if (!pageNumber || pageNumber <= 1) {
      limit = 10
      skip = pageNumber * 10 - 10
    }
    totalAnnouncementResponseCount = await AnnouncementResponseModel.count()
    result = await AnnouncementResponseModel.find(query).limit(limit).skip(skip)
    res
      .status(200)
      .send({ status: 200, result, totalAnnouncementResponseCount })
  } catch (e) {
    res.status(400).send({
      status: 400,
      message: "Announcement Responses can't be fetched",
    })
  }
}

// Submit response to particular announcement

const submitAnnouncementResponse = async (req, res, next) => {
  try {
    const { AnnouncementResponseModel } = res.locals.connection.databaseObject
    const { announcementID } = req.query
    const { announcementResponse } = req.body
    const newResponse = await AnnouncementResponseModel.create({
      announcementReferenceID: announcementID,
      announcementResponse,
    })
    await newResponse.save()
    res.status(200).send({
      status: 200,
      message: 'Announcement Response has been submitted!',
    })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({
      status: 400,
      message: "Announcement Response can't be saved",
    })
  }
}

const viewSelectedAnnouncement  = async (req, res, next) => {
  const { announcerEmail } = req.query;
  const { AnnouncementModel } = res.locals.connection.databaseObject;

  const data = await AnnouncementModel.find({ announcerEmail });

  const response = data[data.length - 1];
  res
    .status(200)
    .send({
      status: 200,
      message: "Announcement has been published!",
      result: data.length,
      data: response,
    });
}


const viewAllAnnouncement = async (req, res, next) => {
  const { announcerEmail } = req.query;
  const { AnnouncementModel } = res.locals.connection.databaseObject;

  const data = await AnnouncementModel.find({ announcerEmail });

 
  res
    .status(200)
    .send({
      status: 200,
      message: "Announcement has been published!",
      result: data.length,
      data
    });
}

module.exports = {
  createAnnouncement,
  viewAnnouncements,
  viewAnnouncementResponse,
  submitAnnouncementResponse,
  viewSelectedAnnouncement,
  viewAllAnnouncement
}

