const { z } = require('zod');

const create = z.object({
  title: z.string().min(1),
  price: z.number().min(1),
  stock: z.number().min(0),
});

const update = z.object({
  title: z.string().min(1).optional(),
  price: z.number().min(1).optional(),
  stock: z.number().min(0).optional(),
});

const variantValidation = {
  create,
  update,
};

module.exports = variantValidation;
