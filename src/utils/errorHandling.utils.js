const handleUniqueConstraintError = (error) => {
  const field = error.errors[0].path;
  const value = error.errors[0].value;

  let message = `Duplicate field value: ${value}. Please use another value for ${field}`;
  return new AppError(message, 400);
};

const handleValidationError = (error) => {
  const errors = error.errors.map((err) => err.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleDatabaseError = (error) => {
  const message = `Database error: ${error.message}`;
  return new AppError(message, 500);
};

const handleForeignKeyConstraintError = (error) => {
  const message = `Invalid input data. ${error.message}`;
  return new AppError(message, 400);
};

module.exports = {
  handleUniqueConstraintError,
  handleValidationError,
  handleDatabaseError,
  handleForeignKeyConstraintError,
};
