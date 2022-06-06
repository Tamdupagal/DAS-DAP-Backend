const Express = require('express')
const Router = Express.Router()
const Companies = require('./Companies/Company')

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

Router.use('/Companies', Companies)
Router.get('/Logout', hasLoggedOut)

module.exports = Router
