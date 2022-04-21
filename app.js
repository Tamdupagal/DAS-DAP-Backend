require('dotenv').config()
const portNumber = process.env.PORT_NUMBER || 8000

const Express = require('express')
const app = Express()
const RouteHandling = require('./Routes/RouteHandling')
const dbConnection = require('./Database/DatabaseConfig/DBConnection')
const db = dbConnection.connection

app.get("/test",(req,res)=>{
console.log("hello world")
})

app.use(RouteHandling)

db.on('error', console.error.bind(console, 'MongoDB connection error'))

// app.listen(process.env.PORT || portNumber, () => {
//   console.log(`running on ${process.env.PORT || portNumber}`)
// })

module.exports = app
