const mongoose = require('mongoose')
const { Schema } = mongoose

const feedBackResponseSchema = new Schema(
  {
    feedbackReferenceId: {
      type: String,
    },
    email: {
      type: String,
    },
    userType: {
      type: String,
    },
    feedbackResponse: [
      {
        feedbackQuestion: {
          type: String,
        },
        feedbackAnswer: {
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
