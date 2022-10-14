const Express = require('express')
const {
  createUser,
  fetchUser,
  updateUser,
  fetchMyUsers,
} = require('../../../../Utils/Users/Users.utils')
const {
  userCreationValidation,
} = require('../../../../Validators/UserCreationValidation')
const Router = Express.Router()

Router.route('/').post([userCreationValidation, createUser])
Router.route('/').get(async (req,res,next)=>{

  try {
    
    const { userModel } = res.locals.connection.databaseObject
    const result = await userModel.find()
    res.status(200).send({ status: 200, result,totalCount:result.length })
  } catch (error) {
    console.log(error)
  }
    
})
Router.route('/search?').get(fetchUser)

Router.route('/myUsers?').get(fetchMyUsers)
// Router.route('/search?').put(updateUser)

module.exports = Router
