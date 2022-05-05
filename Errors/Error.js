class Error {
  constructor(errName, errMessage, errType, errStatusCode) {
    ;(this.errName = errName),
      (this.errMessage = errMessage),
      (this.errType = errType),
      (this.errStatusCode = errStatusCode)
  }
}

module.exports = Error
