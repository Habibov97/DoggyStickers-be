const authService = require('../services/auth.service');

const login = async (req, res) => {
  const result = await authService.login(req.body);
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
