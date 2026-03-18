const config = require('../config');
const {
  handleUniqueConstraintError,
  handleValidationError,
  handleDatabaseError,
  handleForeignKeyConstraintError,
} = require('../utils/errorHandling.utils');

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const globalErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.nodeENV === 'development') {
    sendErrDev(err, res);
  } else if (config.nodeENV === 'production') {
    if (err.name === 'SequelizeUniqueConstraintError') err = handleUniqueConstraintError(err);
    if (err.name === 'SequelizeValidationError') err = handleValidationError(err);
    if (err.name === 'SequelizeDatabaseError') err = handleDatabaseError(err);
    if (err.name === 'SequelizeForeignKeyConstraintError') err = handleForeignKeyConstraintError(err);

    sendErrProd(err, res);
  }
};

module.exports = globalErrorMiddleware;
