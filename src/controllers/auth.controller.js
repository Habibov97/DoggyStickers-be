const authService = require('../services/auth.service');
const config = require('../config/index');
const login = async (req, res) => {
  const result = await authService.login(req.body);
  let cookieSettings = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'Lax',
  };

  if (config.nodeENV === 'production') cookieSettings.secure = true;

  res.cookie('jwt', result.token, cookieSettings);

  res.json(result);
};

const register = async (req, res) => {
  const result = await authService.register(req.body);
  res.json(result);
};

const currentUser = async (req, res) => {
  const result = req.user;
  console.log(result);

  res.json(result);
};

const authController = {
  login,
  register,
  currentUser,
};

module.exports = authController;
