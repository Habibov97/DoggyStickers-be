const TokenStorage = require('../models/TokenStorage.model');
const User = require('../models/User.model');
const AppError = require('../utils/AppError.utils');
const { encodePayload } = require('../utils/jwt.utils');
const bcrpyt = require('bcrypt');

const login = async (params) => {
  const user = await User.findOne({ where: { email: params.email } });
  if (!user) throw new AppError('email or password is incorrect!', 404);

  const password = await bcrpyt.compare(params.password, user.password);
  if (!password) throw new AppError('email or password is incorrect!', 404);

  let token = encodePayload({ userId: user.id });

  let findToken = await TokenStorage.findOne({ where: { userId: user.id } });
  if (findToken) await findToken.destroy();

  await TokenStorage.create({ userId: user.id, token });

  user.password = undefined;

  return { token, user };
};

const register = async (params) => {
  const existsUser = await User.findOne({ where: { email: params.email } });
  if (existsUser) throw new AppError('User already exists', 409);

  let user = User.build(params);

  user.password = await bcrpyt.hash(params.password, 10);

  await user.save();

  user.password = undefined;

  return user;
};

const authService = {
  login,
  register,
};

module.exports = authService;
