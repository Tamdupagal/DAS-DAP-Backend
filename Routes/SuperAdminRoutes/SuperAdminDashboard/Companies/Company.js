const Express = require('express')
const Router = Express.Router()

const {taskFlowValidation} = require('../../../../Validators/CompanyValidator')
const createCompany = require('../../../../Utils/Company/Company.utils')



Router.route('/new').post([taskFlowValidation,createCompany])

module.exports = Router
