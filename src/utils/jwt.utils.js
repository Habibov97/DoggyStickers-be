const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('./AppError.utils');

const encodePayload = (payload) => {
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '5d' });
  return token;
};

const decodedPayload = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (!decoded) throw new AppError('invalid token', 400);
    return decoded;
  } catch (error) {
    return false;
  }
};

module.exports = {
  encodePayload,
  decodedPayload,
};
