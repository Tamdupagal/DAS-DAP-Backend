const ajv = new (require('ajv'))()

let innerProperties = {
  type: 'object',
  properties: {
    stepNumber: { type: 'integer' },
    title: { type: 'string' },
    targetURL: { type: 'string' },
    htmlTag: { type: 'string' },
    cssSelector: { type: 'string' },
    customURL: { type: 'string' },
    taskMessage: { type: 'string' },
    targetClickOffsetX: { type: 'integer' },
    targetClickOffsetY: { type: 'integer' },
  },
}

const schema = {
  type: 'object',
  properties: {
    applicationName: { type: 'string' },
    applicationURL: { type: 'string' },
    applicationTaskFlowUseCase: { type: 'string' },
    taskList: { type: 'array', items: innerProperties },
  },
  required: ['applicationTaskFlowUseCase'],
  additionalProperties: false,
}

module.exports = {
  async taskFlowValidation(req, res, next) {
    try {
      const validate = ajv.compile(schema)
      let validity = await validate(req.body)
      if (!validity) {
        res.status(400).send({
          status: 400,
          message:
            validate.errors[0].instancePath.split('/')[1] +
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
        message: 'Internal Server Error',
      })
    }
  },
}
