const imageService = require('../services/image.service');

const list = async (req, res) => {
  let result = await imageService.list(req.params.productId);

  res.json(result);
};

// const create = async (req, res) => {
//   let result = await imageService.list(req.params.productId);

//   res.json(result);
// };

// const remove = async (req, res) => {
//   let result = await imageService.list(req.params.productId);

//   res.json(result);
// };

const imageController = {
  list,
  // create,
  // remove,
};

module.exports = imageController;
