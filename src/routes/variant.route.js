const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const variantController = require('../controllers/variant.controller');
const variantValidation = require('../validations/variant.validation');

const variantRouter = express.Router();

variantRouter
  .route('/:productId/variants')
  .get(variantController.list)
  .post(authMiddleware, roleMiddleware, validationMiddleware(variantValidation.create), variantController.create);

variantRouter
  .route('/variants/:id')
  .patch(authMiddleware, roleMiddleware, validationMiddleware(variantValidation.update), variantController.update)
  .delete(authMiddleware, roleMiddleware, variantController.remove);

module.exports = variantRouter;
