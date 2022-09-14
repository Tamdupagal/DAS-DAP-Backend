const Schema = require('mongoose').Schema

const taskFlowAnalytics = new Schema({
  applicationDomain: {
    type: String,
  },
  applicationTaskFlowUseCase: {
    type: String,
  },
  timesCompletedByUsers: {
    type: Number,
    default: 0,
  },
  timesStoppedByUsers: {
    type: Number,
    default: 0,
  },
})

taskFlowAnalytics.statics.updateAnalytics = async function (data) {
  try {
    const {
      applicationTaskFlowUseCase,
      applicationDomain,
      isCompleted,
      isAborted,
    } = data
    let query

    if (isCompleted) query = {$inc: { timesCompletedByUsers: 1 } }
    if (isAborted) query = { $inc: { timesStoppedByUsers: 1 } }
    const existingAnalytics = await this.findOneAndUpdate(
      {
        applicationTaskFlowUseCase,
        applicationDomain,
      },
       query ,
      { new: true,upsert:true }
    )
    if(!existingAnalytics){
      return { isUpdated: false }
    }
    return { isUpdated: true }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = taskFlowAnalytics
