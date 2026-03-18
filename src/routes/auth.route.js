const express = require('express');

const authRouter = express.Router();

authRouter.route('/login').post(authController.login);

module.exports = authRouter;
