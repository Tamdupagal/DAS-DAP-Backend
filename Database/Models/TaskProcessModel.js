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
    required: [true, 'Application TaskFlowUseCase is required'],
  },
  taskList: [
    {
      stepNumber: {
        type: Number,
      },
      htmlTag: {
        type: String,
      },
      targetURL: {
        type: String,
      },
      title: {
        type: String,
      },
      taskMessage: {
        type: String,
      },
      xPath: {
        type: String,
      },
      targetClickOffsetX: {
        type: Number,
      },
      targetClickOffsetY: {
        type: Number,
      },
    },
  ],
})

module.exports = mongoose.model('TaskFlow', taskFlowSchema)
