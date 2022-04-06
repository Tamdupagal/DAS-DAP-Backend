const mongoose = require('mongoose')
const { Schema } = mongoose

const tokenSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Token', tokenSchema)
