const TokenStorage = require('../models/TokenStorage.model');
const User = require('../models/User.model');
const AppError = require('../utils/AppError.utils');
const { decodedPayload } = require('../utils/jwt.utils');

const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) throw new AppError('Unauthorized', 401);

  token = token.split(' ')[1];

  const verifyToken = decodedPayload(token);

  const exist = await TokenStorage.findOne({
    where: { userId: verifyToken.userId, token },
  });

  if (!exist) {
    throw new AppError('Invalid token', 401);
  }

  const user = await User.findOne({ where: { id: verifyToken.userId } });
  if (!user) throw new AppError('Unauthorized', 401);

  req.user = user;

  next();
};

module.exports = authMiddleware;
