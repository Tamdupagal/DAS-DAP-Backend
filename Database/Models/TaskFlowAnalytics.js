const Schema = require('mongoose').Schema

const taskFlowAnalytics = new Schema({
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
    const { applicationTaskFlowUseCase, isCompleted, isAborted } = data
    let query

    if (isCompleted) query = { $inc: { timesCompletedByUsers: 1 } }
    if (isAborted) query = { $inc: { timesStoppedByUsers: 1 } }
    const existingAnalytics = await this.findOneAndUpdate(
      {
        applicationTaskFlowUseCase,
      },
      { query },
      { new: true }
    )
    console.log(existingAnalytics)
    return { isUpdated: true }
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = taskFlowAnalytics
