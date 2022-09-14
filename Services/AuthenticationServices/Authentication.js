require('dotenv').config()
const {
  dependencyInjector,
  EnrolledCompanies,
} = require('../../Database/Schemas/AuthenticationDBConnection')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const Error = require('../../Errors/Error')

const Authentication = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    if (authorization == null) {
      throw new Error(
        'MissingCredentials',
        'Request Headers Missing',
        'Verification Error',
        401
      )
    }
    if (!/Bearer/.test(authorization)) {
      throw new Error(
        'InvalidCredentials',
        'Session Expired',
        'Verification Error',
        401
      )
    }
    let token = await authorization.split('Bearer')[1].trim()
    JWT.verify(token, process.env.secret, (err, data) => {
      if (err)
        throw new Error(
          'InvalidToken',
          'AuthToken Invalid or Expired',
          'Integrity Error',
          401
        )
    })
    next()
  } catch (e) {
    res.status(e.status).send({
      status: e.status,
      auth: false,
      message: e.message,
    })
  }
}

const Authorization = async (req, res) => {
  const { email, password } = req.body
  try {
    const { companyUserModel } = await dependencyInjector(res.locals.params)
    const record = await companyUserModel.findOne({
      email: email,
    })
    let temp = email.split('@')[1]
    let databaseID = temp.split('.')[0]
    if (record === null) {
      throw new Error(
        'UserN/A',
        'No such User exists!',
        'Availability Error',
        404
      )
    } else {
      const verify = await bcrypt.compare(password, record.password)
      if (!verify) {
        throw new Error(
          'InvalidCredentials',
          'Invalid Email or Password',
          'Verification Error',
          403
        )
      }
      const token = JWT.sign({ id: record._id }, process.env.secret, {
        expiresIn: 86400,
      })
      res.status(200).send({
        status: 200,
        auth: true,
        token,
        typeOfUser: record.typeOfUser,
        databaseID: databaseID,
        userEmail: record.email,
      })
    }
  } catch (e) {
    res.status(e.status).send({
      status: e.status,
      auth: false,
      message: e.message,
    })
  }
}

const DatabaseValidation = async (req, res, next) => {
  try {
    const { databaseID } = req.params
    let record = await EnrolledCompanies.findOne({
      companyName: databaseID,
    })
    if (record == null) {
      throw new Error(
        'CompanyN/A',
        'No such company exists!',
        'Availability Error',
        404
      )
    }
    res.locals.params = databaseID
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
