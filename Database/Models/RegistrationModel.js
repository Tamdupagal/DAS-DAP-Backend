const Schema = require("mongoose").Schema;
const demoModel = new Schema({
  userName: {
    type: String,
  },
  companyName: {
    type: String,
    unique: true,
    trim: true,
  },
  workEmail: {
    type: String,
    unique: true,
    trim: true,
  },
});

module.exports = demoModel;
