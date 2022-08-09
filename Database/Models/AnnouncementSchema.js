const Schema = require('mongoose').Schema
const validator = require('validator')
const AnnouncementSchema = new Schema(
  {
    announcementCreatorName: {
      type: String,
    },
    announcementDate: {
      type: String,
      required: true,
    },
    announcementTitle: {
      type: String,
      required: true,
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
          validate: (value) => {
            return validator.isEmail(value)
          },
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
