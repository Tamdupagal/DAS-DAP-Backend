const Express = require('express')
const Router = Express.Router()
const Companies = require('./Companies/Company')

const {
  hasLoggedOut,
} = require('../../../Services/AuthenticationServices/Authentication')

Router.use('/companies', Companies)
Router.get('/logout', hasLoggedOut)

module.exports = Router
