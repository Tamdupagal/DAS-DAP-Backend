const Express = require('express')
const {
  createUser,
  fetchUser,
  updateUser,
} = require('../../../../Utils/Users/Users.utils')
const {
  userCreationValidation,
} = require('../../../../Validators/UserCreationValidation')
const Router = Express.Router()

Router.route('/').post([userCreationValidation, createUser])

Router.route('/search?').get(fetchUser)
// Router.route('/search?').put(updateUser)

module.exports = Router
