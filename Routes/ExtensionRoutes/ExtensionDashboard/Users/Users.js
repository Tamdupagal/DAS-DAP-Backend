const Express = require('express')
const { fetchUser } = require('../../../../Utils/Users/Users.utils')
const Router = Express.Router()

Router.route('/search?').get(fetchUser)

module.exports = Router
