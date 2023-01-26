const Schema = require("mongoose").Schema;

const taskAnalytics = new Schema({
  taskId: {
    type: Schema.ObjectId,
    ref:"TaskManagement"
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
