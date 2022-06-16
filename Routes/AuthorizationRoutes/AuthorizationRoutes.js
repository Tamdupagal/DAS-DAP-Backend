const Express = require('express')
const {
  DatabaseValidation,
  isAuthorized,
} = require('../../Services/AuthenticationServices/Authentication')
const Router = Express.Router()

Router.post('/:databaseID/Login', [DatabaseValidation, isAuthorized])

module.exports = Router
