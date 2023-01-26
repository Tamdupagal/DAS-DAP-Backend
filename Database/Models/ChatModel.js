const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const ChatModel = new Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    message: [
      {
        _id:{type:String},
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
