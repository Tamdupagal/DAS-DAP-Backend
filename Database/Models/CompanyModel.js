const Schema = require('mongoose').Schema

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
  },
  companyPassword: {
    type: String,
  },
})

module.exports = CompanyModel
