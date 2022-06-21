const mongoose = require('mongoose')
const { Schema } = mongoose

const feedBackResponseSchema = new Schema(
  {
    feedBackResponseID: {
      type: String,
      unique: true,
    },
    feedBackReferenceID: {
      type: String,
      required: true,
    },
    UserName: {
      type: String,
    },
    UserType: {
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
