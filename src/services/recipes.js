import { RecipesCollection } from '../db/models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllRecipes = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find();
  const recipesCount = await RecipesCollection.find()
    .merge(recipesQuery)
    .countDocuments();

  const recipes = await recipesQuery.skip(skip).limit(limit).exec;

  const paginationData = await calculatePaginationData(
    recipesCount,
    perPage,
    page,
  );

  return {
    data: recipes,
    ...paginationData,
  };
};

export const getRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findById(recipeId);
  return recipe;
};

export const createRecipe = async (payload) => {
  const recipe = await RecipesCollection.create(payload);
  return recipe;
};

export const deleteRecipe = async (recipeId) => {
  const recipe = await RecipesCollection.findOneAndDelete({
    _id: recipeId,
  });
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
  if (!rawResult || !rawResult.value) {
    return null;
  }
  return {
    recipe: rawResult,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
