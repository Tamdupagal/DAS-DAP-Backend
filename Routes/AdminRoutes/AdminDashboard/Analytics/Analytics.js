const Express = require('express')
const Router = Express.Router()

Router.route('/search?').put((req, res, next) => {
  console.log(req.params)
})

module.exports = Router
