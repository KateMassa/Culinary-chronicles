import Joi from 'joi';

const ingredientSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Ingredient name is required',
  }),
  amount: Joi.string().required().messages({
    'string.empty': 'Ingredient amount is required',
  }),
});

const stepSchema = Joi.object({
  description: Joi.string().required().messages({
    'string.empty': 'Step description is required',
  }),
});

export const createRecipeSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required',
  }),
  ingredients: Joi.array().items(ingredientSchema).min(1).required().messages({
    'array.min': 'At least one ingredient is required',
  }),
  steps: Joi.array().items(stepSchema).min(1).required().messages({
    'array.min': 'At least one step is required',
  }),
  cookingTime: Joi.number().integer().min(1).required().messages({
    'number.base': 'Cooking time must be a number',
    'number.min': 'Cooking time must be at least 1 minute',
  }),
  author: Joi.string().messages({
    'string.empty': 'Author is required',
  }),
  createdAt: Joi.date().default(Date.now),
});

export const updateRecipeSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  ingredients: Joi.array().items(ingredientSchema).min(1),
  steps: Joi.array().items(stepSchema).min(1),
  cookingTime: Joi.number().integer().min(1),
  author: Joi.string(),
});
