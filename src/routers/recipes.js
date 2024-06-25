import { Router } from 'express';

import {
  getAllRecipesController,
  getRecipeByIdController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/recipes', ctrlWrapper(getAllRecipesController));

router.get('/recipes/:recipeId', ctrlWrapper(getRecipeByIdController));

export default router;
