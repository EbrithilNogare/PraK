require("dotenv").config();
const nodemailer = require("nodemailer");

if (!process.env.GMAILusername) {
  console.log("Missing process.env.GMAILusername");
  return;
}
if (!process.env.GMAILpassword) {
  console.log("Missing process.env.GMAILpassword");
  return;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAILusername,
    pass: process.env.GMAILpassword,
  },
});

module.exports = (from, to, subject, text) => {
  transporter.sendMail({ from, to, subject, text }, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};
/*
mail(
  "sojkakrakonosovaprak@gmail.com",
  "d@nogare.cz",
  "Sending Email using Node.js",
  "That was easy!"
);
*/
