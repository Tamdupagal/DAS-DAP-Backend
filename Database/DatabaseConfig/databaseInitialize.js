const dependencyInjector = require('../Schemas/DBConnection')
const logger = require('../../Services/Logger/Logger')
const databaseInitialize = async (req, res, next) => {
  try {
    let databaseObject = await dependencyInjector(req.params.databaseID)
    res.locals.connection = { databaseObject }
    next()
  } catch (e) {
    logger.error(
      `Failed to initialze the database due ${e.message} for host ${req.host} via the URL ${req.url}`
    )
    res
      .status(500)
      .send({ status: 500, message: 'Internal Server Error! Contact Support.' })
  }
}

module.exports = databaseInitialize
