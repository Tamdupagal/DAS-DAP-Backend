const ajv = new (require('ajv'))()

const schema = {
  type: 'object',
  properties: {
    userName: { type: 'string' },
    email: {
      type: 'string',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$',
    },

    companyEmail:{ type: 'string' },
    password: { type: 'string' },
  },
  required: ['userName', 'email', 'password','companyEmail'],
  additionalProperties: false,
}

module.exports = {
  async userCreationValidation(req, res, next) {
    try {
      const validate = ajv.compile(schema)
      let validity = await validate(req.body)
      if (!validity) {
        res.status(400).send({
          status: 400,
          message:
            validate.errors[0].instancePath.split('/').slice(-1) +
            ' ' +
            validate.errors[0].message,
          data: validate.errors,
        })
      } else {
        next()
      }
    } catch (error) {
      console.log(error)
      res.status(400).send({
        status: 500,
        message: 'Internal Server Error- from User-Creation Validation',
      })
    }
  },
}
