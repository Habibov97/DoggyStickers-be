const express = require('express');
const userController = require('../controllers/user.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
// const authValidation = require('../validations/auth.validation');
const roleMiddleware = require('../middlewares/role.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const resetPasswordValidation = require('../validations/reset-password.validation');

const userRouter = express.Router();

/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Get list of all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 email: user1@gmail.com
 *                 username: user1
 *                 role: user
 *                 isActive: true
 *               - id: 2
 *                 email: admin@gmail.com
 *                 username: admin
 *                 role: admin
 *                 isActive: true
 *       403:
 *         description: Forbidden (not admin)
 */

/**
 * @swagger
 * /users/password:
 *   post:
 *     summary: Reset user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password, newPassword, repeatPassword]
 *             properties:
 *               password:
 *                 type: string
 *                 example: Daniel123!
 *               newPassword:
 *                 type: string
 *                 example: Daniel1234!
 *               repeatPassword:
 *                 type: string
 *                 example: Daniel1234!
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Password has been changed successfully!
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
userRouter.route('/list').get(authMiddleware, roleMiddleware, userController.listOfUsers);

userRouter
  .route('/password')
  .post(authMiddleware, validationMiddleware(resetPasswordValidation), userController.resetPassword);

module.exports = userRouter;
