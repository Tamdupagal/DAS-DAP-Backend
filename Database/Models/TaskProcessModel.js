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
      stepNumber: Number,
      htmlTag: {
        type: String,
      },
      targetURL: {
        type: String,
      },
      indexValueOfTag: {
        type: Number,
      },
      lengthOfCollection: {
        type: Number,
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
