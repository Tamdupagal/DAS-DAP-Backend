const Schema = require("mongoose").Schema;

const NotificationModel = new Schema({
  receiverId: {
    type: Schema.ObjectId,
    ref: "User",
  },
  chatNotification: [
    {
      senderId: { type: Schema.ObjectId, ref: "User" },
      content: { type: String },
      messageCount: { type: Number, default: 1 },
    },
  ],
  groupChatNotification: [
    {
      groupName: { type: String },
      content: { type: String },
      messageCount: { type: Number, default: 1 },
    },
  ],
  taskNotification: { content: [{ type: String }] },
  supportNotification: { type: Number,default:1 },
});

module.exports = NotificationModel;
