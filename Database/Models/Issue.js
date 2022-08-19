const Schema = require('mongoose').Schema

const issue = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    bugReport: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    isFixed: {
      type: Boolean,
    },
    fixedOn: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = issue
