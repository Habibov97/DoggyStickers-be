const express = require('express');
const userController = require('../controllers/user.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
// const authValidation = require('../validations/auth.validation');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const resetPasswordValidation = require('../validations/reset-password.validation');

const userRouter = express.Router();

userRouter.route('/list').get(authMiddleware, roleMiddleware, userController.listOfUsers);

userRouter
  .route('/password')
  .post(authMiddleware, validationMiddleware(resetPasswordValidation), userController.resetPassword);

module.exports = userRouter;
