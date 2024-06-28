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

router.get('/', ctrlWrapper(getRecipesController));

router.get('/:recipeId', isValidId, ctrlWrapper(getRecipeByIdController));

router.post(
  '',
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.put(
  '/:recipeId',
  isValidId,
  validateBody(updateRecipeSchema),
  ctrlWrapper(upsertRecipeController),
);

router.patch(
  '/:recipeId',
  isValidId,
  validateBody(updateRecipeSchema),
  ctrlWrapper(patchRecipeController),
);

router.delete('/:recipeId', isValidId, ctrlWrapper(deleteRecipeController));

export default router;
