const Error = require('../Error')

const DataBaseError = (err) => {
  switch (err.name) {
    case 'ValidationError':
      for (field in err.errors) {
        return new Error(
          field,
          err.errors[field].message,
          'Validation Error',
          404
        )
      }
    case 'MongoServerError':
      for (const duplicateField in err.keyValue) {
        return new Error(
          err.name,
          `${duplicateField} value already exists!`,
          'Duplicate Data Error',
          409
        )
      }
    case `${'TaskFlowNull'}`:
      return new Error(
        'TaskFlowNA',
        `No ${err.value} in task-flows exists!`,
        'Availability Error',
        404
      )
    case 'TaskFlowUseCaseArrayNull':
      return new Error(
        'TaskFlowUseCaseArrayNull',
        "Requested TaskFlows don't exist!",
        'Availability Error',
        404
      )
  }
}

module.exports = DataBaseError
