const Express = require("express");
const { deleteUpdates, createUpdates } = require("../../../../Utils/Updates/Updates.utils");
const Router = Express.Router();

Router.post('/',createUpdates);

Router.delete('/:id',deleteUpdates);

module.exports = Router