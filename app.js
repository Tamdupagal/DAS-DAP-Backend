require('dotenv').config()

const Express = require('express')
const app = Express()
const RouteHandling = require('./Routes/RouteHandling')
const portNumber = process.env.PORT_NUMBER || 8000
const dbConnection = require('./Database/DatabaseConfig/DBConnection')
const db = dbConnection.connection

app.use(RouteHandling)

db.on('error', console.error.bind(console, 'MongoDB connection error'))

app.listen(process.env.PORT || portNumber, () => {
  console.log(`running on ${process.env.PORT || portNumber}`)
})

module.exports = app
