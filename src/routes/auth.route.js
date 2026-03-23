const express = require('express');
const authController = require('../controllers/auth.controller');
const validationMiddleware = require('../middlewares/validation.middleware');
const authValidation = require('../validations/auth.validation');
const authMiddleware = require('../middlewares/auth.middleware');
const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
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
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
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

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     description: Returns the currently authenticated user based on JWT token
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved current user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64f1c2a9e1234567890abcde
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                 role:
 *                   type: string
 *                   example: user
 *       401:
 *         description: Unauthorized - token missing or invalid
 */

authRouter.route('/login').post(validationMiddleware(authValidation.login), authController.login);

authRouter.route('/register').post(validationMiddleware(authValidation.register), authController.register);

authRouter.route('/me').get(authMiddleware, authController.currentUser);

module.exports = authRouter;
