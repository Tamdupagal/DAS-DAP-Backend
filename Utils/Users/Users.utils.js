const bcrypt = require('bcrypt')
const ObjectId = require('mongoose').Types.ObjectId

const {
  dependencyInjector,
} = require('../../Database/Schemas/AuthenticationDBConnection')

const createUser = async (req, res) => {
  try {

    const { userName, email, password ,companyEmail} = req.body


    let testCase = new RegExp(res.locals.params, 'g')
    if (!testCase.test(email)) {
      throw new Error(
        'User cannot be saved due to conflict in email! please use company email.'
      )
    }

    const { userModel } = res.locals.connection.databaseObject
    const { companyUserModel } = await dependencyInjector(res.locals.params)

    let user = await userModel.findUser({ email })
    if (user.isExisting) throw new Error(`${email} already exists.`)
    let newUser = await userModel.create({
      userName: userName,
      email: email,
      password: password,

      companyEmail:companyEmail,

      typeOfUser: 'User',
    })
    let newLoginUser = await companyUserModel.create({
      userName: userName,
      email: email,
      password: await bcrypt.hash(password, 10),
      typeOfUser: 'User',
    })

    res.status(200).send({ status: 200, message: `${userName} has joined ` })
  } catch (e) {
    console.log(e.message)
    res.status(400).send({ satus: 400, message: e.message })
  }
}

// Fetch Task Flow

const fetchUser = async (req, res, next) => {
  try {
    const { userModel } = res.locals.connection.databaseObject
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
    limit = 1000
    let totalCount = await userModel.count()
    let result = await userModel
      .find(query, { password: 0 })
      .skip(skip)
      .limit(limit)
    res.status(200).send({ status: 200, result, totalCount })
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
    res.status(400).send({
      status: 400,
      message: err.message,
    })
  }
}

const fetchMyUsers = async (req,res,next)=>{
  const { userModel } = res.locals.connection.databaseObject
  try {

    const {companyEmail} = req.query;
    const response = await userModel.find({companyEmail});

    res.status(200).send({ status: 200, result: response.length,data:response })
    
  } catch (err) {
     res.status(200).send({
      status: 400,
      message: err.message,
    })
  }

}

module.exports = {
  createUser,
  fetchUser,
  updateUser,
  fetchMyUsers
}
