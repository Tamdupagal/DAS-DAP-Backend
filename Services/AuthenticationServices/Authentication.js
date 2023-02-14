require("dotenv").config();
const {
  dependencyInjector,
  EnrolledCompanies,
} = require("../../Database/Schemas/AuthenticationDBConnection");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Error = require("../../Errors/Error");
const { promisify } = require("util");
const { companyModel } = require("../../Database/Schemas/SuperAdminConnection");

const Authentication = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (authorization == null) {
      throw new Error(
        "MissingCredentials",
        "Request Headers Missing",
        "Verification Error",
        401
      );
    }
    if (!/Bearer/.test(authorization)) {
      throw new Error(
        "InvalidCredentials",
        "Session Expired",
        "Verification Error",
        401
      );
    }
    let token = await authorization.split("Bearer")[1].trim();
    JWT.verify(token, process.env.secret, (err, data) => {
      if (err)
        throw new Error(
          "InvalidToken",
          "AuthToken Invalid or Expired",
          "Integrity Error",
          401
        );
    });
    next();
  } catch (e) {
    res.status(e.status).send({
      status: e.status,
      auth: false,
      message: e.message,
    });
  }
};

const Authorization = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { companyUserModel } = await dependencyInjector(res.locals.params);
    const record = await companyUserModel.findOne({
      email: email,
    });
    let temp = email.split("@")[1];
    let databaseID = temp.split(".")[0];
    if (record === null) {
      throw new Error(
        "UserN/A",
        "No such User exists!",
        "Availability Error",
        404
      );
    } else {
      const verify = await bcrypt.compare(password, record.password);
      if (!verify) {
        throw new Error(
          "InvalidCredentials",
          "Invalid Email or Password",
          "Verification Error",
          403
        );
      }
      const token = JWT.sign({ id: record._id }, process.env.secret, {
        expiresIn: 86400,
      });
      res.status(200).send({
        status: 200,
        auth: true,
        token,
        typeOfUser: record.typeOfUser,
        databaseID: databaseID,
        userEmail: record.email,
        userId: record._id,
        companyEmail: record.companyEmail,
      });
    }
  } catch (e) {
    res.status(e.status).send({
      status: e.status,
      auth: false,
      message: e.message,
    });
  }
};

const DatabaseValidation = async (req, res, next) => {
  try {
    const { databaseID } = req.params;
    let record = await EnrolledCompanies.findOne({
      companyName: databaseID,
    });
    if (record == null) {
      throw new Error(
        "CompanyN/A",
        "No such company exists!",
        "Availability Error",
        404
      );
    }
    res.locals.params = databaseID;
    next();
  } catch (e) {
    res.status(400).send({
      message: `${req.params.databaseID} doesn't exists!`,
      redirect: "/Home/ContactUs",
    });
  }
};

// const userValidation = async (req, res, next) => {
//   try {
//     const email = req.body.email.split("@")[1].split(".")[0];
//     const password = req.body.password;
//     let record = await EnrolledCompanies.findOne({
//       companyName: email,
//     });
//     if (record == null) {
//       throw new Error(
//         "CompanyN/A",
//         "No such company exists!",
//         "Availability Error",
//         404
//       );
//     }
//     const { companyUserModel } = await dependencyInjector(email);
//     res.locals.connection.databaseObject = companyUserModel;
//     if (password) {
//       req.body.password = await bcrypt.hash(password, 8);
//     }
//     next();
//   } catch (e) {
//     res.status(400).send({
//       status: 400,
//       message: "This company doesn't exists!",
//     });
//   }
// };

const Logout = async (req, res) => {
  try {
    res.status(200).send({ status: 200, canLogout: true, token: "" });
  } catch (Error) {
    res.status(400).send({ status: 400, canLogout: true, token: "" });
  }
};

const SuperAdminAuthorization = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new Error("You are not logged in Please Login To get Access");
    }

    const decoded = await promisify(JWT.verify)(token, process.env.secret);
    let record = await EnrolledCompanies.findOne({
      companyName: process.env.SUPER_ADMIN_COMPANY_NAME,
    });

    const { companyUserModel } = await dependencyInjector(record.companyName);

    const superAdmin = await companyUserModel.findOne({
      email: process.env.SUPER_ADMIN_EMAIL,
    });

    if (superAdmin._id == decoded.id && superAdmin.typeOfUser == "SuperAdmin") {
      return next();
    } else {
      throw new Error(`You Don't have permission for these route`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 400,
      message: error.message || error.name || "Some Error Occurred",
    });
  }
};

module.exports = {
  isAuthenticated: Authentication,
  isAuthorized: Authorization,
  hasLoggedOut: Logout,
  DatabaseValidation,
  SuperAdminAuthorization,
  
};
