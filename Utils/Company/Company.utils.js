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

    const  {userModel}  = dependencyInjectorTest(
      req.body.companyEmail.split('.')[0]
    )
    console.log(userModel)
    
    //  console.log("model",UserModel,"name",req.body.companyEmail.split('.')[0])
    // console.log("models",models)
    const newUser = await userModel.create({
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

const getAllCompanies = async (req,res,next)=>{
  try {
    const response = await companyModel.find();
    res.status(200).send({
      status:200,
      result:response.length,
      data:response
    })
    
  } catch (error) {
    res.status(400).send({
      status:400,
      message:error.message||'Some Error occured!'
    })
  }
}

module.exports = {createCompany,getAllCompanies}
