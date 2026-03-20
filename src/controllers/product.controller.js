const { Image } = require('../models');
const productService = require('../services/product.service');
const AppError = require('../utils/AppError.utils');
const { uploadImage, deleteImage } = require('../utils/supabase-helper.utils');

const upload = async (req, res, next) => {
  try {
    const files = req.files;

    const images = await Promise.all(
      files.map(async (file) => {
        const { url, fileName } = await uploadImage(file);

        return await Image.create({
          imageUrl: url,
          fileName,
          productId: req.params.productId,
        });
      }),
    );

    res.json({
      message: 'images uploaded successfully',
      data: images,
    });
  } catch (error) {
    next(error);
  }
};
const removeImage = async (req, res, next) => {
  try {
    const image = await Image.findByPk(req.params.imageId);
    if (!image) throw new AppError('Image not found', 404);

    await deleteImage(image.fileName);
    await image.destroy();

    res.json({ status: 'image deleted successfully' });
  } catch (err) {
    next(err);
  }
};

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
  upload,
  removeImage,
};

module.exports = productController;
