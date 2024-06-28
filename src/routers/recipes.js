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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', authenticate, ctrlWrapper(getRecipesController));

router.get(
  '/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(getRecipeByIdController),
);

router.post(
  '',
  authenticate,
  validateBody(createRecipeSchema),
  ctrlWrapper(createRecipeController),
);

router.put(
  '/:recipeId',
  authenticate,
  isValidId,
  validateBody(updateRecipeSchema),
  ctrlWrapper(upsertRecipeController),
);

router.patch(
  '/:recipeId',
  authenticate,
  isValidId,
  validateBody(updateRecipeSchema),
  ctrlWrapper(patchRecipeController),
);

router.delete(
  '/:recipeId',
  authenticate,
  isValidId,
  ctrlWrapper(deleteRecipeController),
);

export default router;
