const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const authValidation = require('../validations/auth.validation');
const authRouter = express.Router();

authRouter.route('/login').post(validationMiddleware(authValidation.login), authController.login);

authRouter.route('/register').post(validationMiddleware(authValidation.register), authController.register);

module.exports = authRouter;
