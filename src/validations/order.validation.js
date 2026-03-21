const { z } = require('zod');

const create = z.object({
  items: z
    .array(
      z.object({
        variantId: z.number().positive(),
        quantity: z.number().positive(),
      }),
    )
    .min(1),
});

const orderValidation = {
  create,
};

module.exports = orderValidation;
