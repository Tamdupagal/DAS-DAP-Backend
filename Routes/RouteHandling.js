const Express = require('express')
const Router = Express.Router()
const cors = require('cors')
const AdminRoutes = require('./AdminRoutes/AdminRoutes')
const SuperAdminRoutes = require('./SuperAdminRoutes/SuperAdminRoutes')
// const AIRoutes = require('./AIRoutes/AIRoutes')
const ExtensionRoutes = require('./ExtensionRoutes/ExtensionRoutes')
const AuthorizationRoutes = require('./AuthorizationRoutes/AuthorizationRoutes')

Router.use(cors())
Router.use(Express.urlencoded({ extended: true }))
Router.use(Express.json())

// Error Handling for invalid JSON

Router.use((err, req, res, next) => {
  if (err.status === 400)
    return res
      .status(err.status)
      .send({ status: err.status, message: 'Invalid JSON format' })
  return next(err)
})

Router.use('/Auth', AuthorizationRoutes)
Router.use('/Admin', AdminRoutes)
Router.use('/Extension', ExtensionRoutes)
Router.use('/SuperAdmin', SuperAdminRoutes)
// Router.use('/AI', AIRoutes)

module.exports = Router
