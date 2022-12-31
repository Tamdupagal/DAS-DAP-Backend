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
  removeMembers,
  deleteGroup,
  deleteMessage,
  deleteGroupMessage,
} = require('../../../../Utils/Users/Users.utils')
const {
  userCreationValidation,
} = require('../../../../Validators/UserCreationValidation')
const Router = Express.Router()

Router.route('/').post([userCreationValidation, createUser])
Router.route('/search?').get(fetchUser)
Router.route('/myUsers?').get(fetchMyUsers)
Router.route('/updateUser').put(updateUser)

// one on one chat routes
Router.route('/postChat').put(postChat)
Router.route('/getChat').get(getChat)
Router.route('/deleteMessage').put(deleteMessage)

// group chat routes
Router.route('/groupChat').post(createGroup)
Router.route('/groupChat').put(sendGroupChat)
Router.route('/groupChat').get(getGroupChat)
Router.route('/groupChat').delete(deleteGroup)
Router.route('/newMembers').put(newMember)
Router.route('/removeMembers').put(removeMembers)
Router.route('/groupChat/deleteMessage').put(deleteGroupMessage)

module.exports = Router
