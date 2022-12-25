const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const GroupChatModel = new Schema(
  {
    adminId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    groupName:{
        type:String,
    },
    members:{
     type:[String]
    },
    message: [
      {
        content: { type: String, default: "" },
        date: { type: Date, default: Date.now() },
        senderId: { type: String, default: "" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = GroupChatModel;
