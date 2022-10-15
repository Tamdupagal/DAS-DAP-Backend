const ajv = new (require('ajv'))()

let innerProperties = {
  type: 'object',
  properties: {
    stepNumber: { type: 'integer' },
    title: { type: 'string' },
    skippable: { type: 'boolean' },
    targetUrl: { type: 'string' },
    cssSelector: { type: 'string' },
    customUrl: { type: 'string' },
    taskMessage: { type: 'string' },
    actionType: { type: 'string' },
    highlightBorderWeight: { type: 'string' },
    backgroundOpacity: { type: 'string' },
    targetClickOffsetX: { type: 'integer' },
    targetClickOffsetY: { type: 'integer' },
  },
  required: ['title', 'taskMessage', 'actionType'],
}

const schema = {
  type: 'object',
  properties: {
    applicationName: { type: 'string' },
    applicationDomain: { type: 'string' },
    applicationTaskFlowUseCase: { type: 'string' },

    companyEmail: { type: 'string' },

    

    taskList: {
      type: 'array',
      items: innerProperties,
    },
  },
  required: [
    'applicationTaskFlowUseCase',
    'applicationName',
    'applicationDomain',

    'companyEmail'

    

  ],
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
        message: 'Internal Server Error from TaskFlow Validation',
      })
    }
  },
}
