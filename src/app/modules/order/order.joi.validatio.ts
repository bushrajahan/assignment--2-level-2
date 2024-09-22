import Joi from 'joi';
import { Types } from 'mongoose';

const objectIdValidator = Joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers;
  }
  return value;
}, 'ObjectId validation');

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const orderSchema = Joi.object({
  email: Joi.string().email().required(), // Validates that email is a valid email address and is required
  productId: objectIdValidator.required(), // Validates MongoDB ObjectId and is required
  price: Joi.number().positive().required(), // Validates that price is a positive number and is required
  quantity: Joi.number().integer().positive().required(), // Validates that quantity is a positive integer and is required
  createdAt: Joi.date().optional(), // Optional date field
});
