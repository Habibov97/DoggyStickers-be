const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const productValidation = require('../validations/product.validation');
const upload = require('../middlewares/upload.middleware');

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: The Unicorn
 *                 desc: They exist!
 *                 slug: the-unicorn
 *                 createdAt: 2026-03-22T05:00:00.000Z
 *                 updatedAt: 2026-03-22T05:00:00.000Z
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, desc]
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Unicorn
 *               desc:
 *                 type: string
 *                 example: They exist!
 *     responses:
 *       200:
 *         description: Created product
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: The Unicorn
 *               desc: They exist!
 *               slug: the-unicorn
 *               createdAt: 2026-03-22T05:00:00.000Z
 *               updatedAt: 2026-03-22T05:00:00.000Z
 */

/**
 * @swagger
 * /products/{slug}:
 *   get:
 *     summary: Get a single product by slug
 *     tags: [Products]
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: the-unicorn
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: The Unicorn
 *               desc: They exist!
 *               slug: the-unicorn
 *               createdAt: 2026-03-22T05:00:00.000Z
 *               updatedAt: 2026-03-22T05:00:00.000Z
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{slug}:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: the-unicorn
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Magic Unicorn
 *               desc:
 *                 type: string
 *                 example: Still exists!
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             example:
 *               message: product has been updated
 *       400:
 *         description: Slug cannot be updated
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{slug}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: the-unicorn
 *     responses:
 *       200:
 *         description: Product removed
 *         content:
 *           application/json:
 *             example:
 *               message: product has been removed
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products/{productId}/images:
 *   post:
 *     summary: Upload images for a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [avatar]
 *             properties:
 *               avatar:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 maxItems: 5
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *         content:
 *           application/json:
 *             example:
 *               message: images uploaded successful
 *               data:
 *                 - id: 1
 *                   imageUrl: https://cdn.example.com/uploads/unicorn.png
 *                   fileName: unicorn.png
 *                   productId: 1
 *                   createdAt: 2026-03-22T05:00:00.000Z
 *                   updatedAt: 2026-03-22T05:00:00.000Z
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /products/images/{imageId}:
 *   delete:
 *     summary: Delete a product image
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: imageId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: image deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Image not found
 */

productRouter
  .route('/')
  .get(productController.list)
  .post(authMiddleware, roleMiddleware, validationMiddleware(productValidation.create), productController.create);

productRouter
  .route('/:slug')
  .get(productController.getItem)
  .patch(authMiddleware, roleMiddleware, validationMiddleware(productValidation.update), productController.update)
  .delete(authMiddleware, roleMiddleware, productController.remove);

productRouter
  .route('/:productId/images')
  .post(authMiddleware, roleMiddleware, upload.array('avatar', 5), productController.upload);

productRouter.route('/images/:imageId').delete(authMiddleware, roleMiddleware, productController.removeImage);

module.exports = productRouter;
