require('dotenv').config()

const https = require('http')
const app = require('./app')
const path = require('path')
const fs = require('fs')

const portNumber = process.env.PORT_NUMBER || 8000

https
  .createServer(
    {
      key: fs.readFileSync('/ssl/cert/key.pem'),
      cert: fs.readFileSync('/ssl/cert/cert/.pem'),
    },
    app
  )
  .listen(process.env.PORT || portNumber, () => {
    console.log(`running on ${process.env.PORT || portNumber}`)
  })

// console.log(__dirname)
