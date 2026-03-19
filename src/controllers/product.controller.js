const productService = require('../services/product.service');

const list = async (req, res) => {
  const result = await productService.list();

  res.json(result);
};

const create = async (req, res) => {
  const result = await productService.create(req.body);

  res.json(result);
};

const getItem = async (req, res) => {
  const result = await productService.getItem(req.params.slug);

  res.json(result);
};

const update = async (req, res) => {
  const result = await productService.update(req.params.slug, req.body);

  res.json(result);
};

const remove = async (req, res) => {
  const result = await productService.remove(req.params.slug);

  res.json(result);
};

const productController = {
  list,
  create,
  getItem,
  update,
  remove,
};

module.exports = productController;
