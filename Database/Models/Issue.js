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
      default: false,
    },
    fixedOn: {
      type: String,
      default: 'N/A',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = issue
