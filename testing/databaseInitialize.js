const dependencyInjector = require('../Database/DatabaseConfig/DBConnection')

const databaseInitialize = async (req, res, next) => {
  try {
    let databaseObject = await dependencyInjector(req.params.databaseID)
    res.locals.connection = { databaseObject }
    next()
  } catch (e) {
    console.log(e)
    res
      .status(500)
      .send({ status: 500, message: 'Internal Server Error! Contact Support.' })
  }
}

module.exports = databaseInitialize
