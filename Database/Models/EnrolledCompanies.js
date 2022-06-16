const Schema = require('mongoose').Schema

const EnrolledCompanies = new Schema({
  companyID: {
    type: String,
  },
  companyName: {
    type: String,
  },
})

module.exports = EnrolledCompanies
