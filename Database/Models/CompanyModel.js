const Schema = require('mongoose').Schema
const validator = require('validator')
const CompanyModel = new Schema(
  {
    companyName: {
      type: String,
    },
    companyEmail: {
      type: String,
    },
    companyPassword: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = CompanyModel
