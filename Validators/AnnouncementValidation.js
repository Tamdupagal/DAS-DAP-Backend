const ajv = new (require('ajv'))()

const innerAnnouncementSchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    userName: { type: 'string' },
  },
}

const schema = {
  type: 'object',
  properties: {
    announcementCreatorName: { type: 'string' },
    announcementDate: { type: 'string' },
    announcementTitle: { type: 'string' },
    announcementBody: { type: 'string' },
    announcementAttachment: { type: 'string' },
    // announcerEmail:{type:'string'},
    announcementReceivers: {
      type: 'array',
      items: innerAnnouncementSchema,
    },
  },
  required: [
    'announcementCreatorName',
    'announcementDate',
    'announcementTitle',
    'announcementBody',
    // 'announcerEmail'
  ],
  additionalProperties: false,
}

module.exports = {
  async announcementSchemaValidation(req, res, next) {
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
        message: 'Internal Server Error',
      })
    }
  },
}
