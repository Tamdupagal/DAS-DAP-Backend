class Error {
  constructor(name, message, type, status) {
    ;(this.name = name),
      (this.message = message),
      (this.type = type),
      (this.status = status)
  }
}

module.exports = Error
