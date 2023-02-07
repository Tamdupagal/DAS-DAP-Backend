const {
  companyModel,
  Registration,
} = require("../../Database/Schemas/SuperAdminConnection");
const {
  dependencyInjector,
  EnrolledCompanies,
} = require("../../Database/Schemas/AuthenticationDBConnection");
const bcrypt = require("bcrypt");
const DatabaseError = require("../../Errors/ErrorTypes/DataBaseError");

const dependencyInjectorTest = require("../../Database/Schemas/DBConnection");

const createCompany = async (req, res, next) => {
  try {
    const { companyEmail, companyUserEmail, companyPassword, companyUserName } =
      req.body;
    const { companyUserModel } = dependencyInjector(companyEmail.split(".")[0]);

    //admin@digitalaidedschool.com

    let companyName = req.body.companyName.split(" ").join("").toLowerCase();

    const newCompany = new companyModel({
      companyUserName: companyUserName || companyUserEmail.split("@")[0],
      companyName,
      companyEmail,
      companyUserEmail,
    });

    const newLoginUser = new companyUserModel({
      userName: companyUserName || companyUserEmail.split("@")[0],
      email: companyUserEmail,
      password: await bcrypt.hash(req.body.companyPassword, 10),
      typeOfUser: "Admin",
    });
    const enrolledCompany = new EnrolledCompanies({
      companyName: companyName,
      companyUserEmail,
    });

    await newCompany.save();
    await newLoginUser.save();
    await enrolledCompany.save();

    const { userModel } = dependencyInjectorTest(
      req.body.companyEmail.split(".")[0]
    );
    console.log(userModel);

    //  console.log("model",UserModel,"name",req.body.companyEmail.split('.')[0])
    // console.log("models",models)
    const newUser = await userModel.create({
      userName: companyUserName || companyUserEmail.split("@")[0],
      email: companyUserEmail,
      password: companyPassword,
      typeOfUser: "Admin",
      companyEmail: companyUserEmail,
    });

    res.status(200).send({
      status: 200,
      message: `${companyName} has joined DAS-DAP succesfully!!`,
    });
  } catch (error) {
    console.log(error.message);
    // let ErrorResponse = DatabaseError(error)
    // console.log(ErrorResponse.errMessage)
    // res.status(ErrorResponse.errStatusCode).send({
    //   status: ErrorResponse.errStatusCode,
    //   message: ErrorResponse.errMessage,
    // })
  }
};

const getAllCompanies = async (req, res, next) => {
  try {
    const response = await companyModel.find();
    res.status(200).send({
      status: 200,
      result: response.length,
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message || "Some Error occured!",
    });
  }
};

const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { companyUserModel } = dependencyInjector(id);
    console.log(companyUserModel);
    // console.log(dependencyInjector(id))
    // await companyModel.findOneAndDelete({companyName:id})
    //   // await EnrolledCompanies.findOneAndDelete({companyName:id})
    // await companyUserModel.drop({ writeConcern: { w: 1 } })
    res.status(202).send({
      status: 202,
      message: "Company Deleted!",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message || "Some Error occured!",
    });
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, workEmail, companyName } = req.body;

    await Registration.create({
      userName: `${firstName} ${lastName}`,
      workEmail,
      companyName,
    });

    res.status(202).send({
      status: 202,
      message: "User Registered!",
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message || "Some Error occured!",
    });
  }
};

const getregisterdUser = async (req, res, next) => {
  try {
    const response = await Registration.find({});
    res.status(202).send({
      status: 202,
      result: response.length,
      data: response,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error.message || "Some Error occured!",
    });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  deleteCompany,
  registerUser,
  getregisterdUser,
};
