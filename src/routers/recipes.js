import { Router } from 'express';

import { getAllRecipes, getRecipeById } from './services/recipes.js';

const router = Router();

router.get('/recipes', async (req, res) => {
  const recipes = await getAllRecipes();

  res.status(200).json({
    data: recipes,
  });
});

router.get('/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    res.status(404).json({
      message: 'Recipe not found',
    });
    return;
  }

  res.status(200).json({
    data: recipe,
  });
});

export default router;
