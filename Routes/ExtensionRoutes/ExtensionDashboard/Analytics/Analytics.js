const Express = require('express')
const {pushAnalytics, getAllAnalytics} = require('../../../../Utils/Analytics/analytics.utils')
const Router = Express.Router()

Router.route('/save').put(pushAnalytics)
Router.route('/allAnalytics').get(getAllAnalytics)

module.exports = Router
