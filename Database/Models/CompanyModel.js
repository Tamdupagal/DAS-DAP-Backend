const Schema = require('mongoose').Schema

const CompanyModel = new Schema({
  companyID: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  companyPassword: {
    type: String,
  },
})

module.exports = CompanyModel
