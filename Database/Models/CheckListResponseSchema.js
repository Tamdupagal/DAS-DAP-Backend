const Schema = require("mongoose").Schema;

const checklistResponseSchema = new Schema(
  {
    checklistReferenceId: {
      type: String,
    },
    checkListResponse: {
      email: {
        type: String,
      },
      response: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = checklistResponseSchema;
