const Express = require('express')
const { pushTaskAnalytics, getTaskAnalytics } = require('../../../../Utils/Analytics/analytics.utils')
const Router = Express.Router()

Router.route('/search?').put((req, res, next) => {
  console.log(req.params)
})

Router.route('/taskAnalytics').put(pushTaskAnalytics).get(getTaskAnalytics)


module.exports = Router
