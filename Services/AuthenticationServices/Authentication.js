require('dotenv').config()

const {
  dependencyInjector,
  EnrolledCompanies,
} = require('../../Database/Schemas/AuthenticationDBConnection')
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
    const { companyUserModel } = await dependencyInjector(res.locals.params)
    let record = await companyUserModel.findOne({
      email: email,
    })
    let temp = email.split('@')[1]
    let databaseID = temp.split('.')[0]
    if (record === null) {
      throw AuthError('recordNull')
    } else {
      let verify = await bcrypt.compare(password, record.password)
      if (verify) {
        let token = JWT.sign({ id: record._id }, process.env.secret, {
          expiresIn: 86400,
        })
        await res.status(200).send({
          status: 200,
          auth: true,
          token,
          typeOfUser: record.typeOfUser,
          databaseID: databaseID,
          userEmail: record.email,
        })
      } else {
        throw AuthError('InvalidCredentials')
      }
    }
  } catch (Error) {
    console.log(Error)
    res.status(Error.errStatusCode).send({
      status: Error.errStatusCode,
      auth: false,
      message: Error.errMessage,
    })
  }
}

const DatabaseValidation = async (req, res, next) => {
  try {
    // let a = req.params.databaseID || req.body.email.split('@')[0]
    let record = await EnrolledCompanies.findOne({
      companyName: req.params.databaseID,
    })
    if (record == null) throw AuthError('recordNull')
    res.locals.params = req.params.databaseID
    next()
  } catch (e) {
    res.status(400).send({
      message: `${req.params.databaseID} doesn't exists!`,
      redirect: '/Home/ContactUs',
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
  DatabaseValidation,
}
