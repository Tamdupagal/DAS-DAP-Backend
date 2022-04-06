require('dotenv').config()
const dbURL = process.env.MONGO_CONNECTION_URL
const mongoose = require('mongoose')

mongoose.connect(dbURL)

module.exports = mongoose
