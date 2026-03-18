const User = require('../models/User.model');
const AppError = require('../utils/AppError.utils');
const bcrypt = require('bcrypt');

const listOfUsers = async (params) => {
  const users = await User.findAll();
  if (!users) throw new AppError('No user found', 404);
  users.map((user) => (user.password = undefined));

  return users;
};

const resetPassword = async (email, params) => {
  let user = await User.findOne({ where: { email } });
  if (!user) throw new AppError('User not found!', 404);

  const equalPrevious = await bcrypt.compare(params.password, user.password);
  if (!equalPrevious) throw new AppError('Password is not correct!', 404);

  if (params.newPassword !== params.repeatPassword) throw new AppError('New passwords must be equal!', 404);

  user.password = await bcrypt.hash(params.newPassword, 10);

  await user.save();

  return { message: 'Password has been changed successfully!' };
};

const userService = {
  listOfUsers,
  resetPassword,
};

module.exports = userService;
