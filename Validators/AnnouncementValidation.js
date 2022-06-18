const ajv = new (require('ajv'))()

const innerAnnouncementSchema = {
  type: 'object',
  properties: {
    userEmail: { type: 'string' },
    userName: { type: 'string' },
  },
}

const schema = {
  type: 'object',
  properties: {
    AnnouncementCreatorName: { type: 'string' },
    AnnouncementDate: { type: 'string' },
    AnnouncementTitle: { type: 'string' },
    AnnouncementBody: { type: 'string' },
    AnnouncementAttachment: { type: 'string' },
    AnnouncementReceivers: {
      type: 'array',
      items: innerAnnouncementSchema,
    },
  },
  // required: [
  //   'AnnouncementCreatorName,AnnouncementDate,AnnouncementTitle',
  //   'AnnouncementBody',
  // ],
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
