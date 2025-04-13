const ajv = new (require('ajv'))()

const innerQuestionSchema = {
  type: 'object',
  properties: {
    feedbackQuestion: { type: 'string' },
    feedbackQuestionType: { type: 'string' },
    feedbackQuestionOptions: {
      type: 'array',
    },
  },
}

const schema = {
  type: 'object',
  properties: {
    feedbackCreatorName: { type: 'string' },
    feedbackQuestions: {
      type: 'array',
      items: innerQuestionSchema,
    },
  },
  required: ['feedbackCreatorName', 'feedbackQuestions'],
  additionalProperties: false,
}

module.exports = {
  async feedBackSchemaValidation(req, res, next) {
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
      res.status(400).send({
        status: 500,
        message: 'Internal Server Error',
      })
    }
  },
}
