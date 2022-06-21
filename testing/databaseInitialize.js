const dependencyInjector = require('../Database/DatabaseConfig/DBConnection')

const databaseInitialize = async (req, res, next) => {
  try {
    let databaseObject = await dependencyInjector(req.params.databaseID)
    res.locals.connection = { databaseObject }
    next()
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

module.exports = databaseInitialize
