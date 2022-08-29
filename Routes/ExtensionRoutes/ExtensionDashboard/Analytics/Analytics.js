const Express = require('express')
const Router = Express.Router()

Router.route('/save?').put((req, res, next) => {
  console.log(req.params)
})

module.exports = Router
