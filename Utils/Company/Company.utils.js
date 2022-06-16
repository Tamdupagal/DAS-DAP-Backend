const {
  companyModel,
} = require('../../Database/DatabaseConfig/SuperAdminConnection')
const {
  dependencyInjector,
  EnrolledCompanies,
} = require('../../Database/DatabaseConfig/AuthenticationDBConnection')
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
    })
    await EnrolledCompany.save()
    await newCompany.save()
    await newUser.save()

    res.status(200).send('Company Registered')
  } catch (error) {
    // console.log(error)
    let ErrorResponse = DatabaseError(error)
    console.log(ErrorResponse.errMessage)
    res.status(ErrorResponse.errStatusCode).send({
      status: ErrorResponse.errStatusCode,
      message: ErrorResponse.errMessage,
    })
  }
}

module.exports = createCompany
