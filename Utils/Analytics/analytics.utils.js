const Error = require('../../Errors/Error')

const pushAnalytics = async (req, res, next) => {
  try {
    const {
      applicationTaskFlowUseCase,
      applicationDomain,
      isCompleted,
      isAborted,
    } = req.body
    const { email } = req.query
    const { analyticsModel, userModel } = res.locals.connection.databaseObject
    let user = await userModel.findUser({ email })
    if (!user.isExisting) {
      throw new Error(
        'UserNA',
        'No such user exists!',
        'Availability Error',
        404
      )
    }
    let query = {
      applicationTaskFlowUseCase,
      applicationDomain,
    }
    if (isCompleted) query.isCompleted = isCompleted
    if (isAborted) query.isAborted = isAborted
    let result = await analyticsModel.updateAnalytics(query)
    res.status(200).send({ status: 200, message: result.message })
  } catch (e) {
    res.status(e.status).send({ status: e.status, message: e.message })
  }
}

module.exports = pushAnalytics
