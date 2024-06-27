import { RecipesCollection } from '../db/models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllRecipes = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'title',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find();

  const [recipesCount, recipes] = await Promise.all([
    RecipesCollection.find().merge(recipesQuery).countDocuments(),
    recipesQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

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
