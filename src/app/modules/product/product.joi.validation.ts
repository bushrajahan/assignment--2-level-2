import Joi from 'joi';

export const variantSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

export const inventorySchema = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(), // Fix: `inStock` should match the field in your Mongoose schema
});

export const productIdSchema = Joi.object({
  productId: Joi.string().required().hex().length(24),
});

export const searchTermSchema = Joi.object({
  searchTerm: Joi.string().min(1).required(),
});

export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).optional(), // Optional field
  variants: Joi.array().items(variantSchema),
  inventory: inventorySchema.required(),
});
