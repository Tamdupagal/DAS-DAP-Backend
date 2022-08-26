const Express = require('express')
const Router = Express.Router()

const createCompany = require('../../../../Utils/Company/Company.utils')

Router.route('/new').post(createCompany)

module.exports = Router
