const Error = require('../../Errors/Error')

const pushAnalytics = async (req, res, next) => {
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
    } = req.body
    // const { email } = req.query
    // console.log(req.body)
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
      companyEmail,
      timeStampStartByUsers,
      timeStampCompletedByUsers
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

const getAllAnalytics = async(req,res,next)=>{
  try {
    const { companyEmail,page } = req.query;
    const {analyticsModel}= res.locals.connection.databaseObject

    let query = {companyEmail},
    projection = { analyticsList: 0 },
    skip,
    limit = 10,
    pageNumber = parseInt(page);
    if (!pageNumber || pageNumber <= 1) pageNumber = 1;

    skip = pageNumber * 10 - 10;

    const totalCount = await analyticsModel.find({companyEmail})

    const response = await analyticsModel.find(query,projection)
    .skip(skip)
    .limit(limit);
    res.status(200).send({ status: 200, result:response.length, totalCount:totalCount.length, data:response })

  } catch (e) {
    res.status(e.status).send({ status: e.status, message: e.message })
  }
}

module.exports = {
  pushAnalytics,
  getAllAnalytics
}
