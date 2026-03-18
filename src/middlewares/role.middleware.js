const AppError = require('../utils/AppError.utils');

const roleMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new AppError('You do not have permission to perform this action', 403));
  }
  next();
};

module.exports = roleMiddleware;
