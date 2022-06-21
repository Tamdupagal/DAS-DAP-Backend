const Express = require('express')
const Router = Express.Router()
const cors = require('cors')
const AdminRoutes = require('./AdminRoutes/AdminRoutes')
const SuperAdminRoutes = require('./SuperAdminRoutes/SuperAdminRoutes')
// const AIRoutes = require('./AIRoutes/AIRoutes')
const ExtensionRoutes = require('./ExtensionRoutes/ExtensionRoutes')
const AuthorizationRoutes = require('./AuthorizationRoutes/AuthorizationRoutes')
Router.use(cors())
Router.use(Express.json())

Router.use('/Auth', AuthorizationRoutes)
Router.use('/Admin', AdminRoutes)
Router.use('/Extension', ExtensionRoutes)
Router.use('/SuperAdmin', SuperAdminRoutes)
// Router.use('/AI', AIRoutes)

module.exports = Router
