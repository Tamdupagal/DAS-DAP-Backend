const mongoose = require('mongoose')
const { Schema } = mongoose

const feedBackSchema = new Schema(
  {
    feedBackQuestionID: {
      type: String,
      unique: true,
    },
    feedBackCreaterName: {
      type: String,
    },
    feedBackQuestions: [
      {
        feedBackQuestion: {
          type: String,
        },
        feedBackQuestionType: {
          type: String,
        },
        feedBackQuestionOptions: {
          type: Array,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = feedBackSchema
