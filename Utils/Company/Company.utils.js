const { companyModel } = require('../../Database/Schemas/SuperAdminConnection')
const {
  dependencyInjector,
  EnrolledCompanies,
} = require('../../Database/Schemas/AuthenticationDBConnection')
const bcrypt = require('bcrypt')
const DatabaseError = require('../../Errors/ErrorTypes/DataBaseError')

const dependencyInjectorTest = require('../../Database/Schemas/DBConnection')

const createCompany = async (req, res, next) => {
  try {
    const { companyEmail, companyUserEmail, companyPassword, companyUserName } =
      req.body
    const { companyUserModel } = dependencyInjector(companyEmail.split('.')[0])

    let companyName = req.body.companyName.split(' ').join('').toLowerCase()

    const newCompany = new companyModel({
      companyUserName,
      companyName,
      companyEmail,
      companyUserEmail,
    })

    const newLoginUser = new companyUserModel({
      userName: companyUserName,
      email: companyUserEmail,
      password: await bcrypt.hash(req.body.companyPassword, 10),
      typeOfUser: 'Admin',
    })
    const enrolledCompany = new EnrolledCompanies({
      companyName: companyName,
      companyUserEmail,
    })

    await newCompany.save()
    await newLoginUser.save()
    await enrolledCompany.save()

    const { UserModel } = dependencyInjectorTest(
      req.body.companyEmail.split('.')[0]
    )
    const newUser = await UserModel.create({
      userName: companyUserName,
      email: companyUserEmail,
      password: companyPassword,
      typeOfUser: 'Admin',
    })

    res.status(200).send({
      status: 200,
      message: `${companyName} has joined DAS-DAP succesfully!!`,
    })
  } catch (error) {
    console.log(error.message)
    // let ErrorResponse = DatabaseError(error)
    // console.log(ErrorResponse.errMessage)
    // res.status(ErrorResponse.errStatusCode).send({
    //   status: ErrorResponse.errStatusCode,
    //   message: ErrorResponse.errMessage,
    // })
  }
}

module.exports = createCompany
