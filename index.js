require("dotenv").config();
const portNumber = process.env.PORT_NUMBER || 8001;
const cluster = require("cluster");
const totalCPUs = require("os").cpus();
const logger = require("./Services/Logger/Logger");
const app = require("./app");
const fs = require("fs");
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000" },
});
// const privateKey = fs.readFileSync(process.env.privateKey, 'utf8')
// const certificate = fs.readFileSync(process.env.certificate, 'utf8')
// const ca = fs.readFileSync(process.env.ca, 'utf8')
io.on("connection", (socket) => {
  socket.on("join", (options, callback) => {
    console.log('join')
    socket.join(options.senderId); 
  });
  socket.on("message", (options, callback) => {
    if (io.sockets.adapter.rooms.get(options.receiverId) === undefined) {
      console.log("offline");   
    }
    console.log('online')
    io.to(options.receiverId).emit("message", { message: options.message });
  });
});

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// }

if (cluster.isMaster) {
  totalCPUs.forEach(async (node) => {
    await cluster.fork();
  });

  cluster.on("exit", async (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} has died!`);
    logger.error(`Worker ${worker.process.pid} has died!`);
    logger.info("Creating a new Worker");
    await cluster.fork();
  });
} else {
  // https
  //   .createServer(credentials, app)
  //   .listen(process.env.PORT || portNumber, () => {
  //     console.log(`running on ${process.env.PORT || portNumber}`)

  //  })
  server.listen(process.env.PORT || portNumber, () => {
    logger.info(
      `Process ${process.pid} is online on port number ${portNumber}`
    );
  });
}
