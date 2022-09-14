const Schema = require('mongoose').Schema

const announcementResponseSchema = new Schema(
  {
    announcementReferenceId: {
      type: String,
    },
    announcementResponse: {
      email: {
        type: String,
      },
      response: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = announcementResponseSchema
