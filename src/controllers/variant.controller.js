const variantService = require('../services/variant.service');

const list = async (req, res) => {
  let result = await variantService.list(req.params.productId);

  res.json(result);
};

const create = async (req, res) => {
  let result = await variantService.create(req.params.productId, req.body);

  res.json(result);
};

const update = async (req, res) => {
  let result = await variantService.update(req.params.id, req.body);

  res.json(result);
};

const remove = async (req, res) => {
  let result = await variantService.remove(req.params.id);

  res.json(result);
};

const variantController = {
  list,
  create,
  update,
  remove,
};

module.exports = variantController;
