const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) next(new Error(error.details[0].message));

    next();
  };
};

module.exports = validationMiddleware;
