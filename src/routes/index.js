const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const productRouter = require('./product.route');
const variantRouter = require('./variant.route');
const orderRouter = require('./order.route');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/products', variantRouter);
router.use('/orders', orderRouter);

module.exports = router;
