const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');
const orderValidation = require('../validations/order.validation');
const orderController = require('../controllers/order.controller');

const orderRouter = express.Router();

orderRouter.route('/').post(authMiddleware, validationMiddleware(orderValidation.create), orderController.create);

orderRouter.route('/my').get(authMiddleware, orderController.listMy);

orderRouter.route('/:id').get(authMiddleware, orderController.getOrder);

orderRouter.route('/').get(authMiddleware, roleMiddleware, orderController.list);

module.exports = orderRouter;
