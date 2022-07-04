require('dotenv').config()

const https = require('https')
const app = require('./app')
const fs = require('fs')
// const http = require('http')

const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/dap.digitalaidedschool.com/privkey.pem',
  'utf8'
)
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/dap.digitalaidedschool.com/cert.pem',
  'utf8'
)
const ca = fs.readFileSync(
  '/etc/letsencrypt/live/dap.digitalaidedschool.com/chain.pem',
  'utf8'
)

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
}

const portNumber = process.env.PORT_NUMBER || 8000

https
  .createServer(credentials, app)
  .listen(process.env.PORT || portNumber, () => {
    console.log(`running on ${process.env.PORT || portNumber}`)
  })

// http.createServer(app)
