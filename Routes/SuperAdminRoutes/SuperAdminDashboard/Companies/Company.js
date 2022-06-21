const Express = require('express')
const Router = Express.Router()

const createCompany = require('../../../../Utils/Company/Company.utils')

Router.route('/createCompany').post(createCompany)
// Router.route('/updateCompany/:applicationTaskFlowUseCase').post(updateTaskFlow)
// Router.route('/viewAllCompany').get(fetchTaskFlows)
// Router.route('/viewCompany/:applicationTaskFlowUseCase').get(fetchTaskFlow)
// Router.route('/deleteCompany/:applicationTaskFlowUseCase').delete(
//   deleteTaskFlow
// )

module.exports = Router
