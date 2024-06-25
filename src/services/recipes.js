import { RecipesCollection } from '../db/models/recipe.js';

export const getAllRecipes = async () => {
  const recipes = await RecipesCollection.find();
  return recipes;
};

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findOne(recipeId);
  return recipe;
};
