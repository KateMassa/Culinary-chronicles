import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js';

import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const recipes = await getAllRecipes({
    userId: req.user._id,
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully retrieved recipes',
    data: recipes,
  });
};

const setAuthRecipeId = (req) => {
  let authRecipeId = {};
  const { recipeId } = req.params;
  const userId = req.user._id;
  if (recipeId) {
    authRecipeId = { _id: recipeId };
  }
  if (userId) {
    authRecipeId = { ...authRecipeId, userId: userId };
  }
  return authRecipeId;
};

export const getRecipeByIdController = async (req, res, next) => {
  const authRecipeId = setAuthRecipeId(req);
  const recipe = await getRecipeById(authRecipeId);

  if (!recipe) {
    return next(createHttpError(404, 'Recipe not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found recipe with id ${authRecipeId}!`,
    data: recipe,
  });
};

export const createRecipeController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const recipe = await createRecipe({
    userId: req.user._id,
    photo: photoUrl,
    ...req.body,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created recipe',
    data: recipe,
  });
};

export const upsertRecipeController = async (req, res, next) => {
  const authRecipeId = setAuthRecipeId(req);
  const result = await updateRecipe(authRecipeId, req.body, { upsert: true });
  if (!result) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Successfully updated recipe',
    data: result.recipe,
  });
};

export const patchRecipeController = async (req, res, next) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const authRecipeId = setAuthRecipeId(req);
  const result = await updateRecipe(authRecipeId, {
    photo: photoUrl,
    ...req.body,
  });
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
  const authRecipeId = setAuthRecipeId(req);
  const recipe = await deleteRecipe(authRecipeId);
  if (!recipe) {
    next(createHttpError(404, 'Recipe not found'));
    return;
  }
  res.status(204).send();
};
