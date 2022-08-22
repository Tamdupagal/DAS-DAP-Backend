const Schema = require('mongoose').Schema
const CompanyModel = new Schema(
  {
    companyName: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    companyUserName: {
      type: String,
    },
    companyeUserEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = CompanyModel
