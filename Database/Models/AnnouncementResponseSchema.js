const Schema = require('mongoose').Schema

const announcementResponseSchema = new Schema(
  {
    AnnouncementResponseID: {
      type: String,
      // required:true
    },
    AnnouncementReferenceID: {
      type: String,
      required: true,
    },
    AnnouncementResponse: {
      UserName: {
        type: String,
      },
      Response: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = announcementResponseSchema
