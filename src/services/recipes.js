import { RecipesCollection } from '../db/models/recipe.js';

export const getAllRecipes = async () => {
  const recipes = await RecipesCollection.find();
  return recipes;
};

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findById(recipeId);
  return recipe;
};

export const createRecipe = async (payload) => {
  const recipe = await RecipesCollection.create(payload);
  return recipe;
};

export const updateRecipe = async (recipeId, payload, options = {}) => {
  const rawResult = await RecipesCollection.findOneAndUpdate(
    { _id: recipeId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteRecipe = async (recipeId) => {
  const recipe = await RecipesCollection.findOneAndDelete({ _id: recipeId });
  return recipe;
};
