import { getAllRecipes, getRecipeById } from '../services/recipes.js';

import createHttpError from 'http-errors';

export const getAllRecipesController = async (req, res) => {
  const recipes = await getAllRecipes();

  res.json({
    status: 200,
    message: 'Successfully retrieved recipes',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully found recipe with id ${recipeId}',
    data: recipe,
  });
};
