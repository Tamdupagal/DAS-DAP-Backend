// const test=require("axios")
const Express = require('express')
const helmet = require('helmet')
const app = Express()
const RouteHandling = require('./Routes/RouteHandling')

app.use(helmet())

app.use(RouteHandling)

// app.listen(process.env.PORT || portNumber, () => {
//   console.log(`running on ${portNumber}`)
// })

module.exports = app
 