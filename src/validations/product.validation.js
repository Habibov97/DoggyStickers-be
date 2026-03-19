const { z } = require('zod');

const create = z.object({
  title: z.string().min(1),
  desc: z.string().min(1),
});

const update = z.object({
  title: z.string().min(1).optional(),
  desc: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
});

const productValidation = {
  create,
  update,
};

module.exports = productValidation;
