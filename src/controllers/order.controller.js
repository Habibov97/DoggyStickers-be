const orderService = require('../services/order.service');

const create = async (req, res) => {
  const result = await orderService.create(req.user.id, req.body);

  res.json(result);
};

const listMy = async (req, res) => {
  const result = await orderService.listMy(req.user.id);

  res.json(result);
};

const getOrder = async (req, res) => {
  const result = await orderService.getOrder(req.params.id, req.user.id);

  res.json(result);
};

const list = async (req, res) => {
  const result = await orderService.list();

  res.json(result);
};

const orderController = {
  create,
  listMy,
  getOrder,
  list,
};

module.exports = orderController;
