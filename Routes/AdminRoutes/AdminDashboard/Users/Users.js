const Express = require('express')
const {
  createUser,
  fetchUser,
  fetchUsers,
} = require('../../../../Utils/Users/Users.utils')
const Router = Express.Router()

Router.route('/createUser').post(createUser)

Router.route('/viewAllUser').get(fetchUsers)

Router.route('/viewUser/:email').get(fetchUser)

module.exports = Router
