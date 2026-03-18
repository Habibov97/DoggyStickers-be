const User = require('../models/User.model');
const AppError = require('../utils/AppError.utils');
const { decodedPayload } = require('../utils/jwt.utils');

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) throw new AppError('Unauthorized', 401);

  token = token.split(' ')[1];

  const verifyToken = decodedPayload(token);
  if (!verifyToken) throw new AppError('Unauthorized', 401);

  const user = await User.findOne({ where: { id: verifyToken.userId } });
  if (!user) throw new AppError('Unauthorized', 401);

  req.user = user;

  next();
};

module.exports = authMiddleware;
