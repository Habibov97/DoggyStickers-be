const dotenv = require('dotenv');
const path = require('path');

let envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

module.exports = {
  nodeENV: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    secure: process.env.SMTP_SECURE === '1' ? true : false,
  },
};
