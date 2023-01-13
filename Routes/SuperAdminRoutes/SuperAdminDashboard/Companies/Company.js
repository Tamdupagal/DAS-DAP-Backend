const Express = require('express')
const { createCompany, getAllCompanies, deleteCompany } = require('../../../../Utils/Company/Company.utils')
const Router = Express.Router()

const {taskFlowValidation} = require('../../../../Validators/CompanyValidator')



Router.route('/new').post([taskFlowValidation,createCompany])
Router.route('/viewAll').get(getAllCompanies)
Router.route('/deleteCompany/:id').delete(deleteCompany)

module.exports = Router
