const Express = require('express')
const {
  pushAnalytics,
  getAllAnalytics,
  getAllAnalyticss,
} = require("../../../../Utils/Analytics/analytics.utils");
const Router = Express.Router()

Router.route('/save').put(pushAnalytics)
Router.route('/allAnalytics').get(getAllAnalytics)
Router.route('/allAnalyticss').get(getAllAnalyticss)

module.exports = Router
