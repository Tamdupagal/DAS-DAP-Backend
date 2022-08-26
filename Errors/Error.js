class Error {
  constructor(name, message, type, status, reference) {
    ;(this.name = name),
      (this.message = message),
      (this.type = type),
      (this.status = status),
      (this.reference = reference)
  }
}

module.exports = Error
