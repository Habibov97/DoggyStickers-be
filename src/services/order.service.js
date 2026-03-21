const { Variant, Order, OrderItem } = require('../models');
const AppError = require('../utils/AppError.utils');

const create = async (userId, paramsObj) => {
  const params = paramsObj.items;

  let total = 0;
  // [
  //   { variantId: 1, quantity: 2 },
  //   { variantId: 2, quantity: 6 }
  // ]

  for (item of params) {
    let variant = await Variant.findByPk(item.variantId);
    if (!variant) throw new AppError('Variant not found', 404);

    if (variant.stock < item.quantity) throw new AppError('Not enough stock', 400);

    total += variant.price * item.quantity;

    variant.stock -= item.quantity;
    await variant.save();
  }

  const order = await Order.create({
    userId,
    totalPrice: total,
  });

  for (item of params) {
    const variant = await Variant.findByPk(item.variantId);

    await OrderItem.create({
      orderId: order.id,
      variantId: variant.id,
      quantity: item.quantity,
      priceAtPurchase: variant.price,
    });
  }

  return order;
};

const listMy = async (id) => {
  const orders = await Order.findAll({
    where: { userId: id },
    include: [
      {
        model: OrderItem,
        as: 'orderItems',
        include: {
          model: Variant,
          as: 'variant',
        },
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  return orders;
};

const getOrder = async (id, userId) => {
  const order = await Order.findByPk(id, {
    include: [
      {
        model: OrderItem,
        as: 'orderItems',
        include: {
          model: Variant,
          as: 'variant',
        },
      },
    ],
  });

  if (!order) throw new AppError('Order not found', 404);

  if (order.userId !== userId) throw new AppError('Unauthorized', 401);

  return order;
};

const list = async () => {
  const orders = await Order.findAll({ include: ['orderItems'] });

  return orders;
};

const orderService = {
  create,
  listMy,
  getOrder,
  list,
};

module.exports = orderService;
