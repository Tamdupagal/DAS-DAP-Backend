const {
  adminUpdates,
  adminQuery,
} = require("../../Database/Schemas/SuperAdminConnection");

const createUpdates = async (req, res, next) => {
  try {
    const { content } = req.body;
    await adminUpdates.create({ content });
    res.status(201).send({
      status: 201,
      data: "Created Successfully!",
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message,
    });
  }
};

const getAllUpdates = async (req, res, next) => {
  try {
    const updates = await adminUpdates.find({});
    res.status(200).send({
      status: 200,
      data: updates,
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message,
    });
  }
};

const deleteUpdates = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminUpdates.findByIdAndDelete(id);
    res.status(202).send({
      status: 202,
      data: "Deleted Succesfully!",
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message,
    });
  }
};

const postQuery = async (req, res, next) => {
  try {
    const { senderId, message, senderObj, receiverId } = req.body;
    const response1 = await adminQuery.findOne({ senderId, receiverId });
    if (response1) {
      if (message)
        message.map((data) => {
          response1.message.push(data);
        });
      if (senderObj) response1.senderObj = senderObj;
      response1.save();
      res.status(200).send({ status: 200, message: "message is sent" });
    } else {
      await adminQuery.create({
        senderId,
        receiverId,
        message,
        senderObj,
      });
      res.status(200).send({ status: 200, message: "message is sent" });
    }
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message,
    });
  }
};

const getAllQuery = async (req, res, next) => {
  try {
    const { senderId, receiverId, typeOfUser } = req.query;
    if (typeOfUser === "SuperAdmin") {
      const response = await adminQuery.find({});
      res.status(200).send({ status: 200, data: response });
    } else {
      const response1 = await adminQuery.findOne({ senderId, receiverId });
      res.status(200).send({ status: 200, data: response1 });
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Chat Not Found!",
    });
  }
};

const getLatestQuery = async (req, res, next) => {
  try {
    const { senderId, typeOfUser } = req.query;
    if (typeOfUser === "SuperAdmin") {
      const response = await adminQuery.find({});
      const arr = [];
      for (let i of response) {
        // console.log(i.message.length)
        if (i.message.length) {
          arr.push({
            latestMessage: i.message.slice(-1),
            senderObj: i.senderObj,
          });
        }
      }
    
      const latestMessageArray = arr.sort((a, b) => {
        // console.log(first)
        let date1 = new Date(a.latestMessage[0].date);
        let date2 = new Date(b.latestMessage[0].date);
        return date2 - date1;
      });

      return res.status(200).send({
        status: 200,
        response: latestMessageArray,
      });
    } else {
      const response = await adminQuery.findOne({ senderId });
      return res.status(200).send({
        status: 200,
        response: response.message.slice(-1),
      });
    }
  } catch (error) {
    // console.log(error)
    res.status(404).send({
      status: 404,
      message: "Not Found!",
    });
  }
};

const deleteQuery = async (req, res, next) => {
  try {
    const { chatId, userId, messageId } = req.body;
    const userChat = await adminQuery.findById(chatId);
    const currentChat = userChat.message.filter(
      (data) => data._id == messageId
    );
    if (currentChat[0].senderId == userId) {
      userChat.message = userChat.message.filter(
        (data) => data._id != messageId
      );
      await userChat.save();
      res.status(200).send({ status: 200, message: "message deleted!" });
    } else {
      throw new Error("Some Error Occured!");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Some Error Occured Please Try Again Later!",
    });
  }
};

module.exports = {
  createUpdates,
  getAllUpdates,
  deleteUpdates,
  postQuery,
  getAllQuery,
  deleteQuery,
  getLatestQuery,
};
