require('dotenv').config()

const UserModel = require('../../Database/Models/UserModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const tokenModel = require('../../Database/Models/TokenModel')

const Authentication = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    if (!authorization) {
      throw new Error('No token provided')
    }
    let tokenRecord = await tokenModel.findOne({ authorization })
    if (tokenRecord === null) {
      throw new Error('Session Invalid')
    }
    JWT.verify(authorization, process.env.secret, (err, response) => {
      if (err) throw new Error('Session Expired')
    })
    next()
  } catch (err) {
    console.log(err.message)
    res.send({
      status: 401,
      auth: false,
      message: err.message,
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
      throw new Error('Invalid Email or Password')
    } else {
      let verify = await bcrypt.compare(password, record.password)
      if (verify) {
        let token = await JWT.sign({ id: record._id }, process.env.secret, {
          expiresIn: 86400,
        })
        await new tokenModel({
          userName: record.userName,
          email: email,
          token: token,
        }).save()
        await res.send({ status: 200, auth: true, token })
      } else {
        throw new Error('Invalid Email or Password')
      }
    }
  } catch (err) {
    console.log(err.message)
    res.send({ status: 401, auth: false, data: err.message })
  }
}

const Logout = async (req, res) => {
  const { authorization } = req.headers
  try {
    let tokenRecord = await tokenModel.findOne({ authorization })
    if (tokenRecord === null) {
      throw new Error('Session Invalid')
    }
    JWT.verify(authorization, process.env.secret, (err, response) => {
      if (err) throw new Error('Session Expired')
      res.send({ canLogout: true, data: { token: '' } })
    })
  } catch (err) {
    console.log(err.message)
    res.send({
      status: 500,
      canLogout: true,
      data: err.message,
    })
  }
}

module.exports = {
  isAuthenticated: Authentication,
  isAuthorized: Authorization,
  hasLoggedOut: Logout,
}