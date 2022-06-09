const Schema = require('mongoose').Schema

const AnnouncementSchema = new Schema(
  {
    AnnouncementID: {
      type: String,
      unique: true,
    },
    AnnouncementCreatorName: {
      type: String,
    },
    AnnouncementDate: {
      type: String,
      required: true,
    },
    AnnouncementTitle: {
      type: String,
      required: true,
    },
    AnnouncementBody: {
      type: String,
    },
    AnnouncementAttachment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = AnnouncementSchema
