const Schema = require('mongoose').Schema
const validator = require('validator')
const CompanyModel = new Schema({
  companyID: {
    type: String,
    unique: true,
  },
  companyName: {
    type: String,
    unique: true,
  },
  companyEmail: {
    type: String,
    unique: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
  },
  companyPassword: {
    type: String,
  },
})

module.exports = CompanyModel
