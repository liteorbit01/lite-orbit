const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@liteorbit.com",
    pass: "YOUR_APP_PASSWORD_HERE",
  },
  tls: {
    rejectUnauthorized: false,   // 👈 ADD THIS
  },
  authMethod: "LOGIN"
});

transporter.verify(function(error, success) {
  if (error) {
    console.error("SMTP FAILED:", error);
  } else {
    console.log("SMTP SUCCESS");
  }
});