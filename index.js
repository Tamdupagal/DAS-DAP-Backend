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

io.on("connection", (socket) => {
  socket.on("join", (options, callback) => {
    socket.join(options.senderId);
  });
  socket.on("message", (options, callback) => {
    io.to(options.receiverId).emit("message", { message: options.message });
  });
  socket.on("createGroup", (options, callback) => {
    socket.join(options.roomName);
    for (user of options.users) {
      io.to(user).emit("groupJoined", {
        roomName: options.roomName,
      });
    }
  });
  socket.on("joinGroup", (options, callback) => {
    socket.join(options.roomName);
  });
  socket.on("groupChat", (options, callback) => {
    io.to(options.groupName).emit("groupMessage", {
      message: options.message,
    });
  });
});

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
  server.listen(process.env.PORT || portNumber, () => {
    logger.info(
      `Process ${process.pid} is online on port number ${portNumber}`
    );
  });
}
