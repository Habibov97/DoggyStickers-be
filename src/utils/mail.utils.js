const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

const sendMail = (from, to, subject, content) => {
  try {
    const result = transporter.sendMail({
      from,
      to,
      subject,
      html: content,
    });

    return result;
  } catch (error) {
    return false;
  }
};

module.exports = {
  sendMail,
};
