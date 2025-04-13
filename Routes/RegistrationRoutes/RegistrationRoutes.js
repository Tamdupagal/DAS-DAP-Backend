const Express = require('express')
const { registerUser } = require('../../Utils/Company/Company.utils')

const Router = Express.Router()

Router.post('/',registerUser)

module.exports = Router

