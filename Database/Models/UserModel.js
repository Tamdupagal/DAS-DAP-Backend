const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: (value) => {
      return validator.isEmail(value)
    },
    lowercase: true,
  },
  password: {
    type: String,
  },
  typeOfUser: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
  },
  updatedOn: {
    type: String,
  },
})

module.exports = UserSchema
