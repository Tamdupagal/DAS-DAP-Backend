const Schema = require("mongoose").Schema;

const taskAnalytics = new Schema({
  taskName: {
    type: Schema.ObjectId,
    ref:"TaskManagement"
  },
  completedBy: {
    type: Schema.ObjectId,
    ref: "User",
  },
  taskAssignedAt: {
    type: Date,
  },
  taskCompletedAt: {
    type: Date,
  },
  timeTaken: {
    type: String,
  },
});

module.exports = taskAnalytics;
