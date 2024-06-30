import { RecipesCollection } from '../db/models/recipe.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllRecipes = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'title',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const recipesQuery = RecipesCollection.find();

  if (filter.title) {
    recipesQuery.where('title').equals(filter.title);
  }
  if (filter.ingredients) {
    recipesQuery.where('ingredients').equals(filter.ingredients);
  }
  if (filter.cookingTime) {
    recipesQuery.where('cookingTime').equals(filter.cookingTime);
  }
  if (filter.createdAt) {
    recipesQuery.where('createdAt').equals(filter.createdAt);
  }

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

export const getRecipeById = async (payload) => {
  const recipe = await RecipesCollection.findOne(payload);
  return recipe;
};

export const createRecipe = async (payload) => {
  const recipe = await RecipesCollection.create(payload);
  return recipe;
};

export const deleteRecipe = async (authRecipeId) => {
  const recipe = await RecipesCollection.findOneAndDelete({
    _id: authRecipeId,
  });
  return recipe;
};

export const updateRecipe = async (authRecipeId, payload, options = {}) => {
  const rawResult = await RecipesCollection.findOneAndUpdate(
    { _id: authRecipeId },
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
