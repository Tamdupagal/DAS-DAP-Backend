const mongoose = require('mongoose')
const { Schema } = mongoose

const taskFlowSchema = new Schema({
  applicationID: {
    type: String,
  },
  applicationName: {
    type: String,
  },
  applicationUrl: {
    type: String,
  },
  applicationDomain: {
    type: String,
  },
  applicationFLowUrl: {
    type: String,
  },
  applicationTaskFlowUseCase: {
    type: String,
  },
  taskList: [
    {
      stepNumber: {
        type: Number,
      },
      htmlTag: {
        type: String,
      },
      targetUrl: {
        type: String,
      },
      actionType: {
        type: String,
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
      customUrl: {
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

taskFlowSchema.statics.findTaskFlow = async function (value) {
  try {
    if (value == null) throw new Error(`Invalid ${value}`)
    const { applicationTaskFlowUseCase, applicationDomain } = value
    let query = {}
    if (applicationTaskFlowUseCase)
      query.applicationTaskFlowUseCase = applicationTaskFlowUseCase
    if (applicationDomain) query.applicationDomain = applicationDomain
    // if (userID) query._id = ObjectId(userID)
    let taskFlow = await this.findOne(query)
    if (taskFlow) return { taskFlow, isExisting: true }
    return { isExisting: false }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = taskFlowSchema
