require('dotenv').config()
const portNumber = process.env.PORT_NUMBER || 8001
// const test=require("axios")
const Express = require('express')
const app = Express()
const RouteHandling = require('./Routes/RouteHandling')

app.use(RouteHandling)

app.listen(process.env.PORT || portNumber, () => {
  // console.log(process.env.PORT)
  console.log(`running on ${process.env.PORT || portNumber}`)
})

module.exports = app
