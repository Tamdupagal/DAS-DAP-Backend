const mongoose = require('mongoose')
const { Schema } = mongoose

const taskFlowSchema = new Schema(
  {
    applicationName: {
      type: String,
    },
    applicationDomain: {
      type: String,
    },
    applicationTaskFlowUseCase: {
      type: String,
    },
    flowDescription:{
      type:String
    },
    companyEmail:{
      type:String,
    },
    taskList: [
      {
        stepNumber: {
          type: Number,
        },
        skippable: {
          type: Boolean,
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
        highlightBorderWeight: {
          type: String,
        },
        backgroundOpacity: {
          type: String,
        },
        targetClickOffsetX: {
          type: Number,
        },
        targetClickOffsetY: {
          type: Number,
        },
        isTooltip:{
          type:Boolean,default:false
        },
        isModel:{
          type:Boolean,default:false
        },
        isHintBox:{
          type:Boolean,default:false
        },
      },
    ],
  },
  { timestamps: true }
)


taskFlowSchema.statics.createNewTask = async function (data) {
  try {
    const {
      applicationName,
      applicationDomain,
      applicationTaskFlowUseCase,
      taskList,
      flowDescription,
      companyEmail
    } = data
    const newTask = await this.create({
      applicationName,
      applicationDomain,
      applicationTaskFlowUseCase,
      taskList,
      flowDescription,
      companyEmail
    })
    return newTask
  } catch (e) {
    return { isError: true, message: e.message }
  }
}

taskFlowSchema.statics.findTaskFlow = async function (data) {
  try {
    if (data == null) throw new Error(`Invalid ${data}`)
    const { applicationTaskFlowUseCase, applicationDomain } = data
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