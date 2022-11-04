const Schema = require('mongoose').Schema

const taskFlowAnalytics = new Schema({
  applicationDomain: {
    type: String,
  },
  applicationTaskFlowUseCase: {
    type: String,
  },
  userEmail:{
    type:String,
  },
  companyEmail:{
    type:String
  },
  timesCompletedByUsers: {
    type: Number,
    default: 0,
  },
  timesStoppedByUsers: {
    type: Number,
    default: 0,
  },
  timeStampStartByUsers:{
    type:String
  },
  timeStampCompletedByUsers:{
    type:String,
  },
})

taskFlowAnalytics.statics.updateAnalytics = async function (data) {
  try {
    const {
      applicationTaskFlowUseCase,
      applicationDomain,
      isCompleted,
      isAborted,
      userEmail,
      companyEmail,
      timeStampStartByUsers,
      timeStampCompletedByUsers
    } = data
    let query

    if (isCompleted) query = {timeStampCompletedByUsers,timeStampStartByUsers, $inc: { timesCompletedByUsers: 1 } }
    if (isAborted) query = { $inc: { timesStoppedByUsers: 1 } }
    const existingAnalytics = await this.findOneAndUpdate(
      {
        applicationTaskFlowUseCase,
        applicationDomain,
        userEmail,
        companyEmail,
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
