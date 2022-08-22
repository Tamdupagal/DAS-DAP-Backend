const bcrypt = require('bcrypt')
const ObjectId = require('mongoose').Types.ObjectId

const {
  dependencyInjector,
} = require('../../Database/Schemas/AuthenticationDBConnection')

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    let testCase = new RegExp(res.locals.params, 'g')
    if (!testCase.test(email)) {
      throw new Error(
        'User cannot be saved due to conflict in email! please use company email.'
      )
    }

    const { UserModel } = res.locals.connection.databaseObject
    const { companyUserModel } = await dependencyInjector(res.locals.params)

    let user = await UserModel.findUser({ email })
    if (user.isExisting) throw new Error(`${email} already exists.`)
    let newUser = await UserModel.create({
      userName: userName,
      email: email,
      password: password,
      typeOfUser: 'User',
    })
    let newLoginUser = await companyUserModel.create({
      userName: userName,
      email: email,
      password: await bcrypt.hash(password, 10),
      typeOfUser: 'User',
    })

    res.status(200).send({ status: 200, message: `${userName} has joined ` })
  } catch (error) {
    console.log(error.message)
    res.status(400).send({ satus: 400, message: error.message })
  }
}

// Fetch Task Flow

const fetchUser = async (req, res, next) => {
  try {
    const { UserModel } = res.locals.connection.databaseObject
    const { email, page, userId } = req.query
    let query = {},
      pageNumber = parseInt(page),
      skip,
      limit
    if (email) query.email = email
    if (userId) query._id = ObjectId(userId)
    if (!pageNumber || pageNumber <= 1) {
      pageNumber = 1
    }
    skip = pageNumber * 10 - 10
    limit = 10
    let totalCount = await UserModel.count()
    let result = await UserModel.find(query, { password: 0 })
      .skip(skip)
      .limit(limit)
    // if (result.length === 0 && (email || userId))
    //   throw new Error('No such Entry found')

    if (result.length !== 1) {
      res.status(200).send({ status: 200, result, totalCount })
    } else {
      res.status(200).send({ status: 200, result: result[0], totalCount })
    }
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
      { email: req.body.email, userName: req.body.userName },
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
  updateUser,
}
