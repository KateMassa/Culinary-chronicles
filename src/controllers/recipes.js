import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js';

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
    return next(createHttpError(404, 'Recipe not found'));
  }

  res.json({
    status: 200,
    message: `Successfully found recipe with id ${recipeId}!`,
    data: recipe,
  });
};

export const createRecipeController = async (req, res) => {
  const recipe = await createRecipe(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created recipe',
    data: recipe,
  });
};

export const upsertRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const result = await updateRecipe(recipeId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully updated recipe',
    data: result.student,
  });
};

export const patchRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const result = await updateRecipe(recipeId, req.body);
  if (!result) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated recipe',
    data: result.recipe,
  });
};

export const deleteRecipeController = async (req, res, next) => {
  const { recipeId } = req.params;
  const recipe = await deleteRecipe(recipeId);
  if (!recipe) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }
  res.status(204).send();
};
