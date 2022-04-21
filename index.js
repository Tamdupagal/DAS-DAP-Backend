require('dotenv').config()

const http = require('http')
const app = require('./app')
const path = require('path')
const fs = require('fs')

const portNumber = process.env.PORT_NUMBER || 8000

http
  .createServer(
    app
  )
  .listen(process.env.PORT || portNumber, () => {
    console.log(`running on ${process.env.PORT || portNumber}`)
  })
