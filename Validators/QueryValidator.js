const queryFields = {
  users: { GET: ['email', 'page', 'userID', 'userName', 'seach'], POST: [] },
  tasks: {
    POST: [],
    GET: ['limit', 'page', 'applicationTaskFlowUseCase', 'applicationDomain'],
    DELETE: ['applicationTaskFlowUseCase', 'applicationDomain'],
  },
  announcement: ['limit', 'page', 'search', 'announcementId', 'userId'],
  feedback: { POST: [], GET: ['limit', 'page', 'search', 'feedbackId'] },
}

const queryValidator = async (req, res, next) => {
  try {
    const test = req.baseUrl.split('/').slice(-1)[0]
    let counter = 0
    if (!queryFields[`${test}`]) {
      throw new Error(`Invalid ${test}`)
    }
    const queryLength = Object.keys(req.query).length
    for (let query in req.query) {
      loop1: for (let field of queryFields[`${test}`][`${req.method}`]) {
        if (query === field) {
          counter++
          break loop1
        }
      }
    }
    if (counter !== queryLength) {
      throw new Error(`Invalid Search Request`)
    }
    next()
  } catch (e) {
    res.status(400).send({ status: 400, message: e.message })
  }
}

module.exports = queryValidator
