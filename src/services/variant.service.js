const { Product } = require('../models');
const Variant = require('../models/Variant.model');
const AppError = require('../utils/AppError.utils');

const list = async (productId) => {
  let variants = await Variant.findAll({
    where: { productId },
    include: {
      model: Product,
      as: 'product',
      attributes: ['id', 'title'],
    },
  });
  if (variants.length === 0) throw new AppError('No variants found', 404);

  return variants;
};

const create = async (productId, params) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new AppError('Product not found', 404);
  console.log(product);

  const searchVariant = product.variants?.find((variant) => variant.title === params.title);
  if (searchVariant) throw new AppError('Variant already exists', 409);

  let variant = await Variant.create({ ...params, productId });

  return variant;
};

const update = async (id, params) => {
  let variant = await Variant.findOne({ where: { id } });
  if (!variant) throw new AppError('Variant not found', 404);

  await variant.update(params);

  return variant;
};

const remove = async (id) => {
  let variant = await Variant.findOne({ where: { id } });
  if (!variant) throw new AppError('Variant not found', 404);

  await variant.destroy();

  return {
    message: 'variant has been removed',
  };
};

const variantService = { list, create, update, remove };

module.exports = variantService;
