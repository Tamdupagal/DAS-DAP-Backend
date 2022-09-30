const Schema = require('mongoose').Schema
const AnnouncementSchema = new Schema(
  {
    announcementCreatorName: {
      type: String,
    },
    announcementDate: {
      type: String,
      // required: true,
    },
    announcementTitle: {
      type: String,
      // required: true,
    },
    announcementBody: {
      type: String,
    },
    announcementAttachment: {
      type: String,
    },
    announcementReceivers: [
      {
        email: {
          type: String,
        },
        userName: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = AnnouncementSchema
