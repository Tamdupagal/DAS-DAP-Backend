const Schema = require("mongoose").Schema;
const adminUpdates = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = adminUpdates;
