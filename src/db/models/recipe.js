import { model, Schema } from 'mongoose';

const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],
  steps: [
    {
      description: {
        type: String,
        required: true,
      },
    },
  ],
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
