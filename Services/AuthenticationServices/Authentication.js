require('dotenv').config()

const UserModel = require('../../Database/Models/UserModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const AuthError = require('../../Errors/ErrorTypes/AuthenticationError')

const Authentication = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    if (authorization === null) {
      throw AuthError('NoToken')
    }
    if (!/Bearer/.test(authorization)) {
      throw AuthError('InvalidTokenFormat')
    }
    let token = await authorization.split('Bearer')[1].trim()
    JWT.verify(token, process.env.secret, (err, response) => {
      if (err) throw AuthError('TokenInvalid')
    })
    next()
  } catch (Error) {
    res.status(Error.errStatusCode).send({
      status: Error.errStatusCode,
      auth: false,
      message: Error.errMessage,
    })
  }
}

const Authorization = async (req, res) => {
  const { email, password } = req.body
  try {
    let record = await UserModel.findOne({
      email: email,
    })
    if (record === null) {
      throw AuthError('recordNull')
    } else {
      let verify = await bcrypt.compare(password, record.password)
      if (verify) {
        let token = await JWT.sign({ id: record._id }, process.env.secret, {
          expiresIn: 86400,
        })
        await res.status(200).send({
          status: 200,
          auth: true,
          token,
          typeOfUser: record.typeOfUser,
        })
      } else {
        throw AuthError('InvalidCredentials')
      }
    }
  } catch (Error) {
    res.status(Error.errStatusCode).send({
      status: Error.errStatusCode,
      auth: false,
      message: Error.errMessage,
    })
  }
}

const Logout = async (req, res) => {
  try {
    res.status(200).send({ status: 200, canLogout: true, token: '' })
  } catch (Error) {
    res.status(400).send({ status: 400, canLogout: true, token: '' })
  }
}

module.exports = {
  isAuthenticated: Authentication,
  isAuthorized: Authorization,
  hasLoggedOut: Logout,
}
