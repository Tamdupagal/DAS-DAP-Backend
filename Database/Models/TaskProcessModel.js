const mongoose = require('mongoose')
const { Schema } = mongoose

const taskFlowSchema = new Schema({
  taskID: {
    type: String,
    unique: true,
  },
  applicationID: {
    type: String,
    unique: true,
  },
  applicationName: {
    type: String,
  },
  applicationURL: {
    type: String,
  },
  applicationFLowURL: {
    type: String,
  },
  applicationTaskFlowUseCase: {
    type: String,
    unique: true,
  },
  taskList: [
    {
      stepNumber: Number,
      id: {
        type: String,
      },
      className: {
        type: String,
      },
      title: {
        type: String,
      },
      taskMessage: {
        type: String,
      },
    },
  ],
})

module.exports = mongoose.model('TaskFlow', taskFlowSchema)
