import { Router } from 'express';

import {
  getRecipesController,
  getRecipeByIdController,
  createRecipeController,
  upsertRecipeController,
  patchRecipeController,
  deleteRecipeController,
} from '../controllers/recipes.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createRecipeSchema,
  updateRecipeSchema,
} from '../validation/recipes.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/recipes', ctrlWrapper(getRecipesController));

router.get(
  '/recipes/:recipeId',
  isValidId,
  ctrlWrapper(getRecipeByIdController),
);

router.post(
  '/recipes',
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.put(
  '/recipes/:recipeId',
  isValidId,
  validateBody(updateRecipeSchema),
  ctrlWrapper(upsertRecipeController),
);

router.patch(
  '/recipes/:recipeId',
  isValidId,
  validateBody(updateRecipeSchema),
  ctrlWrapper(patchRecipeController),
);

router.delete(
  '/recipes/:recipeId',
  isValidId,
  ctrlWrapper(deleteRecipeController),
);

export default router;
