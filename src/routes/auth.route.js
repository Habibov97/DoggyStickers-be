const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const authValidation = require('../validations/auth.validation');
const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *      - name: Auth
 *      description: Authentication endpoints
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: najaff.habibov@gmail.com
 *               password:
 *                 type: string
 *                 example: Najaf123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: "jwt_token_here"
 *               user:
 *                 id: 5
 *                 email: najaff.habibov@gmail.com
 *                 username: najaff
 *                 role: user
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags:
 *       - name: Auth
 *       description: Authentication endpoints
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, username]
 *             properties:
 *               email:
 *                 type: string
 *                 example: najaff.habibov@gmail.com
 *               password:
 *                 type: string
 *                 example: Najaf123!
 *               username:
 *                 type: string
 *                 example: najaff
 *               phoneNumber:
 *                 type: string
 *                 example: +994702584181
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             example:
 *               id: 5
 *               email: najaff.habibov@gmail.com
 *               username: najaff
 *               phoneNumber: +994702584181
 *               role: user
 *               isActive: true
 *               createdAt: "2026-03-22T03:46:21.164Z"
 *               updatedAt: "2026-03-22T03:46:21.164Z"
 *       400:
 *         description: Validation error
 */
authRouter.route('/login').post(validationMiddleware(authValidation.login), authController.login);

authRouter.route('/register').post(validationMiddleware(authValidation.register), authController.register);

module.exports = authRouter;
