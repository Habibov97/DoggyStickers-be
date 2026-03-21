const authService = require('../services/auth.service');

const login = async (req, res) => {
  const result = await authService.login(req.body);
  let cookieSettings = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
    sameSite: 'Lax',
  };

  res.cookie('jwt', result.token);

  res.json(result);
};

const register = async (req, res) => {
  const result = await authService.register(req.body);
  res.json(result);
};

const authController = {
  login,
  register,
};

module.exports = authController;
