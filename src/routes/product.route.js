const express = require('express');
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const productValidation = require('../validations/product.validation');
const upload = require('../middlewares/upload.middleware');

const productRouter = express.Router();

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

productRouter.route('/images/:imageId').delete(authMiddleware, roleMiddleware, productController.remove);

module.exports = productRouter;
