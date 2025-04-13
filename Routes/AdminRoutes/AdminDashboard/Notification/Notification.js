const Express = require('express')
const { pushNotification, getNotification, deleteNotification, filterNotification } = require('../../../../Utils/Notification/Notification.utils')
const Router = Express.Router()


Router.route('/').put(pushNotification)
Router.route('/:id').get(getNotification).delete(deleteNotification)
Router.route("/filterNotification").put(filterNotification)
module.exports = Router