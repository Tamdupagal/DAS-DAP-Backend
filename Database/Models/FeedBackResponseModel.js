const mongoose = require('mongoose')
const { Schema } = mongoose

const feedBackResponseSchema = new Schema(
  {
    feedBackReferenceID: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    userType: {
      type: String,
    },
    feedBackResponse: [
      {
        feedBackQuestion: {
          type: String,
        },
        feedBackAnswer: {
          type: String,
        },
        responseTimeStamp: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = feedBackResponseSchema
