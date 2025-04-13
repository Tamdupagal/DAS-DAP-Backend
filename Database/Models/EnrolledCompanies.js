const Schema = require('mongoose').Schema

const EnrolledCompanies = new Schema({
  companyName: {
    type: String,
  },
  companyUserEmail: {
    type: String,
  },
})

module.exports = EnrolledCompanies
