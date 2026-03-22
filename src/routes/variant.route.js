const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const variantController = require('../controllers/variant.controller');
const variantValidation = require('../validations/variant.validation');

const variantRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Variants
 *     description: Product variant management
 */

/**
 * @swagger
 * /products/{productId}/variants:
 *   get:
 *     summary: Get all variants of a product
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: List of product variants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Product not found
 *
 *   post:
 *     summary: Create a new variant for a product
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VariantCreate'
 *     responses:
 *       201:
 *         description: Variant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       409:
 *         description: Variant already exists
 */

/**
 * @swagger
 * /variants/{id}:
 *   patch:
 *     summary: Update a variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the variant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VariantUpdate'
 *     responses:
 *       200:
 *         description: Variant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Variant not found
 *
 *   delete:
 *     summary: Delete a variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the variant
 *     responses:
 *       200:
 *         description: Variant deleted successfully
 *       404:
 *         description: Variant not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Variant:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         productId:
 *           type: integer
 *         title:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         stock:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     VariantCreate:
 *       type: object
 *       required:
 *         - title
 *         - price
 *         - stock
 *       properties:
 *         title:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         stock:
 *           type: integer
 *
 *     VariantUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         stock:
 *           type: integer
 */

variantRouter
  .route('/:productId/variants')
  .get(variantController.list)
  .post(authMiddleware, roleMiddleware, validationMiddleware(variantValidation.create), variantController.create);

variantRouter
  .route('/variants/:id')
  .patch(authMiddleware, roleMiddleware, validationMiddleware(variantValidation.update), variantController.update)
  .delete(authMiddleware, roleMiddleware, variantController.remove);

module.exports = variantRouter;
