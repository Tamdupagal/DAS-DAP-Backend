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
      targetURL: {
        type: String,
      },
      skippable: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      actionType: {
        type: String,
      },
      taskMessage: {
        type: String,
      },
      cssSelector: {
        type: String,
      },
      customURL: {
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

module.exports = taskFlowSchema
