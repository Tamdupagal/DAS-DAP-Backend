const { adminUpdates, adminQuery } = require("../../Database/Schemas/SuperAdminConnection");

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
    const { senderId, receiverId, message } = req.body;
    const response1 = await adminQuery.findOne({ senderId, receiverId });
    const response2 = await adminQuery.findOne({
      senderId: receiverId,
      receiverId: senderId,
    });
    if (response1) {
      if (message)
        message.map((data) => {
          response1.message.push(data);
        });
      response1.save();
      res.status(200).send({ status: 200, message: "message is sent" });
    } else if (response2) {
      if (message)
        message.map((data) => {
          response2.message.push(data);
        });
      response2.save();
      res.status(200).send({ status: 200, message: "message is sent" });
    } else {
      await adminQuery.create({
        senderId,
        receiverId,
        message,
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
    const { senderId, receiverId } = req.query;
    const response1 = await adminQuery.findOne({ senderId, receiverId })
    const response2 = await adminQuery.findOne({
      senderId: receiverId,
      receiverId: senderId,
    })
    if (response1) {
      res.status(200).send({ status: 200, data: response1 });
    } else if (response2) {
      res.status(200).send({ status: 200, data: response2 });
    } else {
      throw new Error("Chat Not Found!");
    }
  } catch (error) {
    res.status(404).send({
      status: 404,
      message: error.message || "Chat Not Found!",
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
  deleteQuery
};
