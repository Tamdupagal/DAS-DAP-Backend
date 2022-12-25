const Express = require('express')
const {
  createUser,
  fetchUser,
  updateUser,
  fetchMyUsers,
  postChat,
  getChat,
  createGroup,
  sendGroupChat,
  getGroupChat,
  newMember,
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

Router.route('/postChat').put(postChat)

Router.route('/getChat').get(getChat)

Router.route('/groupChat').post(createGroup)
// Router.route('/groupChat').get(sendGroupChat)
Router.route('/groupChat').put(sendGroupChat)
Router.route('/groupChat').get(getGroupChat)
Router.route('/newMember').put(newMember)
// Router.route('/search?').put(updateUser)

module.exports = Router
