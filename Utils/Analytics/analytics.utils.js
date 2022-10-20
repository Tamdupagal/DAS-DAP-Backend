const Error = require('../../Errors/Error')

const pushAnalytics = async (req, res, next) => {
  try {
    const {
      applicationTaskFlowUseCase,
      applicationDomain,
      isCompleted,
      isAborted,
      userEmail,
      companyEmail
    } = req.body
    // const { email } = req.query
    console.log(req.body)
    const { analyticsModel } = res.locals.connection.databaseObject
    // let user = await userModel.findUser({ email })
    // if (!user.isExisting) {
    //   throw new Error(
    //     'UserNA',
    //     'No such user exists!',
    //     'Availability Error',
    //     404
    //   )
    // }
    let query = {
      applicationTaskFlowUseCase,
      applicationDomain,
      userEmail,
      companyEmail
    }
    if (isCompleted) query.isCompleted = isCompleted
    if (isAborted) query.isAborted = isAborted
    let result = await analyticsModel.updateAnalytics(query)
    if(!result.isUpdated){
      throw new Error(
            'Server Error',
            'Updation Not Possible,Please contact Support! ',
            '',
            500
          )
    }
    res.status(200).send({ status: 200, message: result.message })
  } catch (e) {
    res.status(e.status).send({ status: e.status, message: e.message })
  }
}

module.exports = pushAnalytics
