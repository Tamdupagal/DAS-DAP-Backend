const Express = require('express')
const { fetchTaskFlow } = require('../../../../Utils/Tasks/Tasks.utils')
const Router = Express.Router()

Router.route('/search?').get(fetchTaskFlow)

Router.route('/').get(async (req,res,next)=>{

    try {

      const { taskFlowModel } = res.locals.connection.databaseObject
        
      const result = await taskFlowModel.find()
      res.status(200).send({ status: 200, result,totalCount:result.length })
    } catch (error) {
      console.log(error)
    }
      
  })

module.exports = Router
