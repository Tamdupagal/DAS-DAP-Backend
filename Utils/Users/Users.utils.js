const crypto = require('crypto')
const UserModel = require('../../Database/Models/UserCreatedModel')
// Create Task Flow

const createUser = async (req, res) => {
  let newUser = await new UserModel({
    userID: await crypto.randomBytes(20).toString('hex'),
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    typeOfUser: req.body.typeOfUser,
    createdOn: new Date().toLocaleString(),
  })
  try {
    await newUser.save()
    await res.send({ status: 200, message: 'User created!' })
  } catch (err) {
    res.send({ status: 503, message: "User can't be saved" })
  }
}

// Fetch Task Flow

const fetchUser = async (req, res, next) => {
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
    res.send({ status: 200, User })
  } catch (err) {
    console.log(err.message)
    res.send({
      status: 400,
      message: err.message,
    })
  }
}

const fetchUsers = async (req, res, next) => {
  try {
    let Users = await UserModel.find({}, { password: 0, userID: 0 })
    if (Users === null) {
      throw new Error("Can't fetch Flow's contact Devs")
    }
    res.send({ status: 200, Users })
  } catch (err) {
    console.log(err.message)
    res.send({
      status: 400,
      message: err.message,
    })
  }
}
// Update Task Flow

const updateUser = async (req, res, next) => {
  try {
    UserModel.findOneAndUpdate(
      {
        email: req.params.email,
      },
      { taskList: req.body.taskList },
      (err, doc) => {
        if (err) throw new Error(err)
        res.send({ status: 200, message: 'Task Updated' })
      }
    )
  } catch (err) {
    console.log(error.message)
    res.send({
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
