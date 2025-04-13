const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const ChatModel = new Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
    },
    receiverId: {
      type: String,
    },
    senderObj: {
      email: { type: String },
      userName: { type: String },
      companyName: { type: String },
      typeOfUser: { type: String },
    },
    message: [
      {
        _id: { type: String },
        content: { type: String, default: "" },
        date: { type: Date, default: Date.now },
        senderId: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = ChatModel;
