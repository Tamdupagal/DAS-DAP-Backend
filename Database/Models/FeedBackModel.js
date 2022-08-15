const mongoose = require('mongoose')
const { Schema } = mongoose

const feedBackSchema = new Schema(
  {
    feedbackCreatorName: {
      type: String,
    },
    feedbackQuestions: [
      {
        feedbackQuestion: {
          type: String,
        },
        feedbackQuestionType: {
          type: String,
        },
        feedbackQuestionOptions: [
          {
            text: {
              type: String,
            },
            image: {
              type: String,
            },
          },
        ],
        feedbackQuestionImage: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = feedBackSchema
