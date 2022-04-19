const Express = require('express')
const Router = Express.Router()
const cors = require('cors')
const AdminRoutes = require('./AdminRoutes/AdminRoutes')
// const AIRoutes = require('./AIRoutes/AIRoutes')
const ExtensionRoutes = require('./ExtensionRoutes/ExtensionRoutes')
const {
  isAuthorized,
} = require('../Services/AuthenticationServices/Authentication')

Router.use(cors())
Router.use(Express.json())

Router.post('/Login', isAuthorized)
Router.use('/Admin', AdminRoutes)
Router.use('/Extension', ExtensionRoutes)
// Router.use('/AI', AIRoutes)

module.exports = Router
