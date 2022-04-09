const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

const UserCreatedSchema = new Schema({
  userID: {
    type: String,
    unique: true,
  },
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
  },
  createdOn: {
    type: String,
  },
})

module.exports = mongoose.model('UserCreated', UserCreatedSchema)
