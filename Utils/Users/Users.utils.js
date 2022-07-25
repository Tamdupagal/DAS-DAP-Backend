const crypto = require('crypto')
const bcrypt = require('bcrypt')
const {
  dependencyInjector,
} = require('../../Database/Schemas/AuthenticationDBConnection')
const DatabaseError = require('../../Errors/ErrorTypes/DataBaseError')
const createUser = async (req, res) => {
  const { UserModel } = res.locals.connection.databaseObject
  const { companyUserModel } = await dependencyInjector(res.locals.params)

  try {
    let testCase = req.body.email.split('@')[1]
    if (res.locals.params !== testCase.split('.')[0]) {
      throw new Error(
        'User cannot be saved due to conflict in email! please use company email'
      )
    }
    let newUser = new UserModel({
      userID: crypto.randomBytes(20).toString('hex'),
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      typeOfUser: 'User',
      createdOn: new Date().toLocaleString(),
    })
    let newLoginUser = new companyUserModel({
      userName: req.body.userName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      typeOfUser: 'User',
      createdOn: new Date().toLocaleString(),
      updatedOn: new Date().toLocaleString(),
    })
    // console.log(newLoginUser)
    await newUser.save()
    await newLoginUser.save()
    res.status(200).send({ status: 200, message: `${userName} has joined ` })
  } catch (error) {
    let ErrorResponse = DatabaseError(error)
    console.log(ErrorResponse.errMessage)
    res.status(ErrorResponse.errStatusCode).send({
      status: ErrorResponse.errStatusCode,
      message: ErrorResponse.errMessage,
    })
  }
}

// Fetch Task Flow

const fetchUser = async (req, res, next) => {
  const { UserModel } = res.locals.connection.databaseObject
  try {
    let User = await UserModel.findOne(
      {
        email: req.params.email,
      },
      { password: 0, userID: 0 }
    )
    if (User === null) {
      throw new Error('No such Entry found')
    }
    res.status(200).send({ status: 200, User })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}

const fetchUsers = async (req, res, next) => {
  const { UserModel } = res.locals.connection.databaseObject
  try {
    let Users = await UserModel.find({}, { password: 0, userID: 0 })
    if (Users === null) {
      throw new Error("Can't fetch Flow's contact Devs")
    }
    res.status(200).send({ status: 200, Users })
  } catch (err) {
    console.log(err.message)
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}
// Update Task Flow

const updateUser = async (req, res, next) => {
  const { UserModel } = res.locals.connection.databaseObject
  try {
    UserModel.findOneAndUpdate(
      {
        email: req.params.email,
      },
      { taskList: req.body.taskList },
      (err, doc) => {
        if (err) throw new Error(err)
        res.status(200).send({ status: 200, message: 'Task Updated' })
      }
    )
  } catch (err) {
    console.log(error.message)
    res.status(200).send({
      status: 400,
      message: error.message,
    })
  }
}

module.exports = {
  createUser,
  fetchUser,
  fetchUsers,
  updateUser,
}
