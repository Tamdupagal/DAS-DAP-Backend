require("dotenv").config();
const portNumber = process.env.PORT_NUMBER || 8001;
const cluster = require("cluster");
const totalCPUs = require("os").cpus();
const logger = require("./Services/Logger/Logger");
const app = require("./app");
const fs = require("fs");
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"],
  },
  maxHttpBufferSize: 1e8,
}); 
io.on("connection", (socket) => {
  // console.log('connection done')
  socket.on("join", (options, callback) => { 
    socket.join(options.senderId);
  });
  socket.on("message", (options, callback) => {
    // console.log(Object.keys(io.of('/').adapter.rooms).length);
   console.log(options.message) 
    io.to(options.receiverId).emit("message", options);
    io.to(options.receiverId).emit('notification',options);
  });
  socket.on("createGroup", (options, callback) => { 
    socket.join(options.roomName); 
    for (user of options.users) {
      io.to(user).emit("groupJoined", {
        roomName: options.roomName,
      });
    }
  });

  socket.on('taskAssigned',(options,callback)=>{
     for(assigned of options.assignedTo){
       io.to(assigned).emit('newTaskAssigned',options);
     }
  })
  
  socket.on("joinGroup", (options, callback) => {
    console.log('user join ',options.roomName)
    socket.join(options.roomName);
  });
  socket.on("groupChat", (options, callback) => {
    console.log(options.message)
    io.to(options.groupName).emit('groupNotification',options);
    io.to(options.groupName).emit("groupMessage", options);
   
  });

  socket.on("deleteMsg",(options,callback)=>{
    console.log("deleted msg start")
    io.to(options.receiverId).emit("deletedMsg",options)
  })

  socket.on("deleteGroupMsg",(options,callback)=>{
    console.log("deleted group msg start")
    socket.broadcast.to(options.groupName).emit("groupMsgDelete",options)
  })

  socket.on('startTyping',(options,callback)=>{
    // console.log("startTyping",options)
    io.to(options.receiverId).emit('startTyping',{senderId:options.senderId})
  })
  socket.on('groupTyping',(options,callback)=>{
    // console.log("startTyping",options)
    io.to(options.groupName).emit('groupTypingStart',options)
  })
  socket.on('stopTyping',(options,callback)=>{
    // console.log("stopTyping",options)
    io.to(options.receiverId).emit('stopTyping',{senderId:options.senderId})
  })
  socket.on('stopGroupTyping',(options,callback)=>{
    // console.log("stopTyping123")
    io.to(options.groupName).emit('groupTypingStop',options)
  })
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
