const { companyModel } = require('../../Database/Schemas/SuperAdminConnection')
const {
  dependencyInjector,
  EnrolledCompanies,
} = require('../../Database/Schemas/AuthenticationDBConnection')
const bcrypt = require('bcrypt')
const DatabaseError = require('../../Errors/ErrorTypes/DataBaseError')

const createCompany = async (req, res, next) => {
  try {
    const { companyUserModel } = dependencyInjector(
      req.body.companyEmail.split('.')[0]
    )
    const { companyEmail, companyUserEmail } = req.body
    let companyName = req.body.companyName.split(' ').join('').toLowerCase()
    const newCompany = new companyModel({
      companyName: companyName,
      companyEmail,
      companyUserEmail,
      companyPassword: await bcrypt.hash(req.body.companyPassword, 10),
    })

    const newUser = new companyUserModel({
      userName: companyName,
      email: companyUserEmail,
      password: await bcrypt.hash(req.body.companyPassword, 10),
      typeOfUser: 'Admin',
    })
    const enrolledCompany = new EnrolledCompanies({
      companyName: companyName,
      companyUserEmail,
    })

    await newCompany.save()
    await newUser.save()
    await enrolledCompany.save()

    res.status(200).send({
      status: 200,
      message: `${req.body.companyName} has joined DAS-DAP succesfully!!`,
    })
  } catch (error) {
    console.log(error.message)
    let ErrorResponse = DatabaseError(error)
    console.log(ErrorResponse.errMessage)
    res.status(ErrorResponse.errStatusCode).send({
      status: ErrorResponse.errStatusCode,
      message: ErrorResponse.errMessage,
    })
  }
}

module.exports = createCompany
