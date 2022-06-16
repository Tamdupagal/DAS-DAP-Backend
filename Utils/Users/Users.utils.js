const crypto = require('crypto')
const bcrypt = require('bcrypt')
// const { UserModel, UserCreatedModel } =
//   require('../../Database/DatabaseConfig/DBConnection')('DigitalAidedSchools')

const createUser = async (req, res) => {
  const { UserModel, UserCreatedModel } = res.locals.connection.databaseObject
  try {
    let newUser = new UserModel({
      userID: crypto.randomBytes(20).toString('hex'),
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      typeOfUser: req.body.typeOfUser,
      createdOn: new Date().toLocaleString(),
    })
    let newLoginUser = new UserCreatedModel({
      userName: req.body.userName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      typeOfUser: req.body.typeOfUser,
      createdOn: new Date().toLocaleString(),
      updatedOn: new Date().toLocaleString(),
    })

    await newUser.save()
    await newLoginUser.save()
    res.status(200).send({ status: 200, message: 'User created!' })
  } catch (err) {
    res.status(503).send({ status: 503, message: err.message })
  }
}

// Fetch Task Flow

const fetchUser = async (req, res, next) => {
  const { UserModel, UserCreatedModel } = res.locals.connection.databaseObject
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
  const { UserModel, UserCreatedModel } = res.locals.connection.databaseObject
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
  const { UserModel, UserCreatedModel } = res.locals.connection.databaseObject
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
