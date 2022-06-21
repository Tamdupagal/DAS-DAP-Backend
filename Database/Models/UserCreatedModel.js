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
    required: [true, 'User Name is Required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is Required'],
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
})

module.exports = UserCreatedSchema
