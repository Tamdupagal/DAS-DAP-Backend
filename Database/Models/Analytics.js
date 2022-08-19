const Schema = require('mongoose').Schema

const analyticsSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  taskflowBasedAnalytics: {
    totalTaskFlowCompletionCount: {
      // gives total count on how many taskflows said user has completed
      type: Number,
    },
    taskflowAnalyticsBasedOnDomain: [
      {
        applicationDomain: {
          // Domain/Appliction on which the taskflow was made
          type: String,
        },
        taskflowDetails: [
          {
            applicationTaskFlowUseCase: {
              // TaskFlow Use Case
              type: String,
            },
            totalNumberOfSteps: {
              // Gives info about number of steps
              type: Number,
            },
            timesCompleted: {
              // counter for how many times the user has completed this particular taskflow
              type: Number,
            },
            minimumCompletetionTime: {
              // minimum completion time for this taskflow
              type: String,
            },
            averageCompletionTime: {
              // average completion time for this taskflow
              type: String,
            },
            maximumCompletionTime: {
              // maximum completion time for this taskflow
              type: String,
            },
          },
        ],
      },
    ],
  },
  userBasedAnalytics: {
    userCreatedOn: {
      type: String,
    },
    userLastUpdateOn: {
      type: String,
    },
    userLastLoggedIn: {
      type: String,
    },
  },
})

module.exports = analyticsSchema
