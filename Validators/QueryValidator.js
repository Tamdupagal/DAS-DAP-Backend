const Error = require('../Errors/Error')
const queryFields = {

  users: { GET: ['email', 'page', 'userId', 'userName','typeOfUser', 'search','companyEmail' ,'senderId','receiverId','groupName','userId'], POST: [] },
  tasks: {
    POST: [],
    GET: ['limit', 'page', 'applicationTaskFlowUseCase', 'applicationDomain','companyEmail',"assignedBy","assignedTo","userId","label","isStarred"],
    PUT: ['limit', 'page', 'applicationTaskFlowUseCase', 'applicationDomain'],
    DELETE: ['applicationTaskFlowUseCase', 'applicationDomain'],
  },
  announcement: ['limit', 'page', 'search', 'announcementId', 'userId'],
  feedback: { POST: [], GET: ['limit', 'page', 'search', 'feedbackId'] },
}

const queryValidator = async (req, res, next) => {
  try {
    const test = req.baseUrl.split('/').slice(-1)[0]
    let counter = 0,
      invalidQueryParams = []
    const queryLength = Object.keys(req.query).length
    for (let query in req.query) {
      loop1: for (let field of queryFields[`${test}`][`${req.method}`]) {
        if (query === field) {
          counter++
          break loop1
        }
        invalidQueryParams.push(query)
      }
    }
    const invalidQuerySet = [...new Set(invalidQueryParams)]
    if (counter !== queryLength) {
      throw new Error(
        'QueryParamsError',
        `Invalid Search Request.`,
        'QueryParamsMissing',
        400,
        invalidQuerySet
      )
    }
    next()
  } catch (e) {
    res
      .status(e.status || 400)
      .send({ status: 400, message: e.message, reference: e.reference })
  }
}

module.exports = queryValidator
