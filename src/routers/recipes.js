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
import { validateBody } from '../utils/validateBody.js';
import {
  createRecipeSchema,
  updateRecipeSchema,
} from '../validation/recipes.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/recipes', ctrlWrapper(getAllRecipesController));

router.get(
  '/recipes/:recipeId',
  isValidId(),
  ctrlWrapper(getRecipeByIdController),
);

router.post(
  '/recipes',
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.put(
  '/recipes/:recipeId',
  validateBody(updateRecipeSchema),
  ctrlWrapper(upsertRecipeController),
);

router.patch(
  '/recipes/:recipeId',
  validateBody(updateRecipeSchema),
  ctrlWrapper(patchRecipeController),
);

router.delete('/recipes/:recipeId', ctrlWrapper(deleteRecipeController));

export default router;
