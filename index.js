require('dotenv').config()
const portNumber = process.env.PORT_NUMBER || 8001
const cluster = require('cluster')
const totalCPUs = require('os').cpus()

// const https = require('https')
const app = require('./app')
// const fs = require('fs')
const http = require('http')

// const privateKey = fs.readFileSync(
//   '/etc/letsencrypt/live/dap.digitalaidedschool.com/privkey.pem',
//   'utf8'
// )
// const certificate = fs.readFileSync(
//   '/etc/letsencrypt/live/dap.digitalaidedschool.com/cert.pem',
//   'utf8'
// )
// const ca = fs.readFileSync(
//   '/etc/letsencrypt/live/dap.digitalaidedschool.com/chain.pem',
//   'utf8'
// )

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// }

// const portNumber = process.env.PORT_NUMBER || 8000

// https
//   .createServer(credentials, app)
//   .listen(process.env.PORT || portNumber, () => {
//     console.log(`running on ${process.env.PORT || portNumber}`)
//   })

if (cluster.isMaster) {
  totalCPUs.forEach(async (node) => {
    let worker = await cluster.fork()
    worker.on('online', () => {
      console.log(`Worker ${worker.process.pid} is online`)
    })
  })

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} has died!`)
    console.log('Starting new Worker')
    cluster.fork()
  })
} else {
  http.createServer(app).listen(portNumber, () => {
    console.log(`Process ${process.pid} is online on port number ${portNumber}`)
  })
}
