import { model, Schema } from 'mongoose';

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const StepSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [IngredientSchema],
  steps: [StepSchema],
  cookingTime: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const RecipesCollection = model('recipes', RecipeSchema);
