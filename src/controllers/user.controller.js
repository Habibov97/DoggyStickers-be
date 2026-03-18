const userService = require('../services/user.service');

const listOfUsers = async (req, res) => {
  const result = await userService.listOfUsers();

  res.json(result);
};

const resetPassword = async (req, res) => {
  const result = await userService.resetPassword(req.user.email, req.body);

  res.json(result);
};

const userController = {
  listOfUsers,
  resetPassword,
};

module.exports = userController;
