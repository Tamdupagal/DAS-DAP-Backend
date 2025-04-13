const Schema = require("mongoose").Schema;

const taskFlowAnalytics = new Schema({
  applicationDomain: {
    type: String,
  },
  applicationTaskFlowUseCase: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  companyEmail: {
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
  timeStampStartByUsers: {
    type: String,
  },
  timeStampCompletedByUsers: {
    type: String,
  },
  timeTaken: {
    type: String,
  },
});

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
    } = data;

    let query;
    let timeTaken;

    const date1 = new Date(timeStampStartByUsers);
    const date2 = new Date(timeStampCompletedByUsers);

    const diffMilliseconds = Math.abs(date2 - date1);
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
    const diffHours = Math.floor(diffMilliseconds / (1000 * 60 * 60));

    if (diffSeconds < 60) {
      timeTaken = diffSeconds + " seconds";
    } else if (diffMinutes < 1) {
      timeTaken = diffMinutes + " minutes";
    } else if (diffHours < 24) {
      timeTaken = diffHours + " hours";
    } else {
      const diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
      timeTaken = diffDays + " days";
    }

    console.log(timeTaken);

    if (isCompleted) {
      query = {
        timeStampCompletedByUsers,
        timeTaken,
        timeStampStartByUsers,
        $inc: { timesCompletedByUsers: 1 },
      };
    }
    if (isAborted) {
      query = { $inc: { timesStoppedByUsers: 1 } };
    }

    const existingAnalytics = await this.findOneAndUpdate(
      {
        applicationTaskFlowUseCase,
        applicationDomain,
        userEmail,
        companyEmail,
      },
      query,
      { new: true, upsert: true }
    );

    if (!existingAnalytics) {
      return { isUpdated: false };
    }

    return { isUpdated: true };
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = taskFlowAnalytics;
