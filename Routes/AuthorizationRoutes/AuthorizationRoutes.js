const Express = require('express')
const databaseInitialize = require('../../Database/DatabaseConfig/databaseInitialize')
const {
  DatabaseValidation,
  isAuthorized,
} = require('../../Services/AuthenticationServices/Authentication')
const { forgotPassword, resetPassword } = require('../../Utils/Users/Users.utils')
const Router = Express.Router()

Router.post('/:databaseID/Login', [DatabaseValidation, isAuthorized])

//forgot Password
Router.post('/forgotPassword/:databaseID',[databaseInitialize,forgotPassword])
Router.post('/resetPassword/:databaseID', [databaseInitialize,resetPassword])
module.exports = Router
