const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const Checklist = new Schema(
  {
    name: {
      type: String,
    },
    adminId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    members: {
      type: Object,
    },
    flows: {
      type: Object,
    },
    // checkListViewed: [ {
    //   email: { type: String },
    //   flowId :{type:String}
    // }],
    allUsers: [
      {
        email: { type: String },
        isCheckList: { type: Boolean, default: true },
      },
    ],
    checkListReceivers: [
      {
        email: {
          type: String,
        },
        userName: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = Checklist;

