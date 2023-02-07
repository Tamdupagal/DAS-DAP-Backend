const Schema = require("mongoose").Schema;
const demoModel = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  companyName: {
    type: String,
  },
  workEmail: {
    type: String,
  },
});

module.exports = demoModel;