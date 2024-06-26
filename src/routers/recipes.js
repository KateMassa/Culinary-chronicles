import { Router } from 'express';

import {
  getAllRecipesController,
  getRecipeByIdController,
  createRecipeController,
  upsertRecipeController,
  patchRecipeController,
  deleteRecipeController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/recipes', ctrlWrapper(getAllRecipesController));

router.get('/recipes/:recipeId', ctrlWrapper(getRecipeByIdController));

router.post('/recipes', ctrlWrapper(createRecipeController));

router.put('/recipes/:recipeId', ctrlWrapper(upsertRecipeController));

router.patch('/recipes/:recipeId', ctrlWrapper(patchRecipeController));

router.delete('/recipes/:recipeId', ctrlWrapper(deleteRecipeController));

export default router;
