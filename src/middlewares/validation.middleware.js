const AppError = require('../utils/AppError.utils');

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { success, error, data } = schema.safeParse(req.body);
    if (!success) {
      let messages = error.issues.map((err) => err.message);
      return next(new AppError(messages.join(', '), 400));
    }

    req.body = data;
    next();
  };
};

module.exports = validationMiddleware;
