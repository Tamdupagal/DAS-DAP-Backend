const Error = require('../Error')

const AuthenticationError = (typeErr) => {
  switch (typeErr) {
    case 'recordNull':
      return new Error(
        'UserNA',
        'No such user exists!',
        'Availability Error',
        404
      )
    case 'InvalidCredentials':
      return new Error(
        'InvalidCredentials',
        'Invalid Email or Password',
        'Verification Error',
        403
      )
    case 'NoToken':
      return new Error(
        'MissingCredentials',
        'Request Headers Missing',
        'Verification Error',
        401
      )
    case 'TokenInvalid':
      return new Error(
        'InvalidCredentials',
        'Session Expired',
        'Verification Error',
        401
      )
    case 'InvalidTokenFormat':
      return new Error(
        'InvalidTokenFormat',
        'Invalid Token Format',
        'Integrity Error',
        401
      )
  }
}

module.exports = AuthenticationError
