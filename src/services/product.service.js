const Image = require('../models/Image.model');
const Product = require('../models/Product.model');
const Variant = require('../models/Variant.model');
const { param } = require('../routes');
const AppError = require('../utils/AppError.utils');
const generateSlug = require('../utils/generateSlug');

const list = async () => {
  let products = await Product.findAll({
    include: [
      {
        model: Variant,
        as: 'variants',
        attributes: ['id', 'title', 'price', 'quantity'],
      },
      {
        model: Image,
        as: 'images',
        attributes: ['id', 'imageUrl'],
      },
    ],
  });
  if (products.length === 0) throw new AppError('No products found', 404);

  return products;
};

const create = async (params) => {
  params.slug = generateSlug(params.title);

  const existsProduct = await Product.findOne({ where: { slug: params.slug } });
  if (existsProduct) throw new AppError('Product already exists', 409);

  let product = Product.build(params);

  await product.save();

  return product;
};

const getItem = async (slug) => {
  const product = await Product.findOne({ where: { slug } });
  if (!product) throw new AppError('Product not found', 404);

  return product;
};

const update = async (slug, params) => {
  if (params.slug) throw new AppError('Slug cannot be updated', 400);

  if (params.title) {
    params.slug = generateSlug(params.title);
  }

  const product = await Product.findOne({ where: { slug } });
  if (!product) throw new AppError('Product not found', 404);

  await product.update(params);

  return {
    message: 'product has been updated',
  };
};

const remove = async (slug) => {
  const product = await Product.findOne({ where: { slug } });
  if (!product) throw new AppError('Product not found', 404);

  await product.destroy();

  return {
    message: 'product has been removed',
  };
};

const productService = {
  list,
  create,
  getItem,
  update,
  remove,
};

module.exports = productService;
