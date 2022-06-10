require('dotenv').config()
const portNumber = process.env.PORT_NUMBER || 8001

const Express = require('express')
const app = Express()
const RouteHandling = require('./Routes/RouteHandling')

app.use(RouteHandling)

app.listen(process.env.PORT || portNumber, () => {
  console.log(`running on ${portNumber}`)
})

module.exports = app
