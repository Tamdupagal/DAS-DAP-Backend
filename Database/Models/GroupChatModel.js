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
        unique:true,
        trim:true
    },
    members:{
     type:[String]
    },
    message: [
      {
        _id:{type:String},
        content: { type: String, default: "" },
        date: { type: Date, default: Date.now },
        senderId: { type: String, default: "" },
        senderName:{type:String,default:''}
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = GroupChatModel;
