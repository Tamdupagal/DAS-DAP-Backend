const Express = require('express')
const pushAnalytics = require('../../../../Utils/Analytics/analytics.utils')
const Router = Express.Router()

Router.route('/save').put(pushAnalytics)

module.exports = Router
