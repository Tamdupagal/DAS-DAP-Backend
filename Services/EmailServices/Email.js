const sg = require("@sendgrid/mail");
const api = process.env.API;
sg.setApiKey(api);

const sendOtp = (email, otp) => {
  sg.send({
    to: email,
    from: "dijitization@gmail.com",
    subject: "forget password!",
    text: `Your one time password (otp) is ${otp}`,
  });
};

module.exports = { sendOtp };
