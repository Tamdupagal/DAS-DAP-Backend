const ajv = new (require("ajv"))();

const schema = {
  type: "object",
  properties: {
    companyName: { type: "string" },
    companyEmail: { type: "string" },
    companyUserEmail: {
      type: "string",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$",
    },
    companyPassword: { type: "string" },
    companyUserName: { type: "string" },
  },
  required: [
    "companyName",
    "companyEmail",
    "companyUserEmail",
    "companyPassword",
    "companyUserName",
  ],
  additionalProperties: false,
};

module.exports = {
  async taskFlowValidation(req, res, next) {
    try {
      const validate = ajv.compile(schema);
      let validity = await validate(req.body);
      if (!validity) {
        res.status(400).send({
          status: 400,
          message:
            validate.errors[0].instancePath.split("/").slice(-1) +
            " " +
            validate.errors[0].message,
          data: validate.errors,
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
};
