const Schema = require('mongoose').Schema
const dateDiffer = require('date-differ')
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
  timeTaken:{
    type:String
  }
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
      timeStampCompletedByUsers,
    } = data
    let query
    let result = "";
    const date1 = new Date(timeStampStartByUsers);
    const date2 = new Date(timeStampCompletedByUsers);
    let diffTime = Math.abs(date2 - date1) / 1000 / 60 / 60;
    let diffMinute = Math.abs(date2 - date1) / 1000 / 60;
    let diffSeconds = Math.abs(date2 - date1) / 1000 
    if(diffSeconds <60){
      result=diffSeconds+" seconds"
    }else
    if(diffTime<1){
      result=diffMinute+" minutes"
    }
    else 
    if (diffTime < 24) {
      result = diffTime + " hours";
    } else {
      result = dateDiffer({
        from: date1,
        to: date2,
      });
    }    
    let timeTaken = result;

    console.log(timeTaken)
    if (isCompleted) query = {timeStampCompletedByUsers,timeTaken, timeStampStartByUsers, $inc: { timesCompletedByUsers: 1 } }
    if (isAborted) query = { $inc: { timesStoppedByUsers: 1 } }
    const existingAnalytics = await this.findOneAndUpdate(
      {
        applicationTaskFlowUseCase,
        applicationDomain,
        userEmail,
        companyEmail,
      },
     query,
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
