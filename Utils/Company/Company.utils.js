const { companyModel } = require('../../Database/Schemas/SuperAdminConnection')
const {
  dependencyInjector,
  EnrolledCompanies,
} = require('../../Database/Schemas/AuthenticationDBConnection')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const DatabaseError = require('../../Errors/ErrorTypes/DataBaseError')

const createCompany = async (req, res, next) => {
  try {
    const { companyUserModel } = dependencyInjector(
      req.body.companyEmail.split('.')[0]
    )
    const newCompany = await companyModel.create({
      companyID: await crypto.randomBytes(20).toString('hex'),
      companyName: req.body.companyName,
      companyEmail: req.body.companyEmail,
      companyUserEmail: req.body.companyUserEmail,
      companyPassword: await bcrypt.hash(req.body.companyPassword, 10),
    })

    const newUser = await companyUserModel.create({
      userID: await crypto.randomBytes(20).toString('hex'),
      userName: req.body.companyName,
      email: req.body.companyUserEmail,
      password: await bcrypt.hash(req.body.companyPassword, 10),
      typeOfUser: 'Admin',
      createdOn: new Date().toLocaleString(),
    })
    const EnrolledCompany = await EnrolledCompanies.create({
      companyID: newCompany.companyID,
      companyName: newCompany.companyName,
      companyUserName: newCompany.companyUserName,
    })
    // await EnrolledCompany.save()
    // await newCompany.save()
    // await newUser.save()

    res.status(200).send({
      status: 200,
      message: `${req.body.companyName} has joined DAS-DAP succesfully!!`,
    })
  } catch (error) {
    let ErrorResponse = await DatabaseError(error)
    console.log(ErrorResponse.errMessage)
    res.status(ErrorResponse.errStatusCode).send({
      status: ErrorResponse.errStatusCode,
      message: ErrorResponse.errMessage,
    })
  }
}

module.exports = createCompany
