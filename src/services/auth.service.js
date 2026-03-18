const User = require('../models/User.model');

const login = async (params) => {
  const user = await User.findOne({ where: { email: params.email } });

  return 'ok';
};

const register = async (params) => {
  const user = await User.findOne({ where: { email: params.email } });

  return 'ok';
};

const authService = {
  login,
  register,
};

module.exports = authService;
