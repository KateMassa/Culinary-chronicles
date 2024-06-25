import { getAllRecipes, getRecipeById } from '../services/recipes.js';

export const getAllRecipesController = async (req, res) => {
  const recipes = await getAllRecipes();

  res.json({
    status: 200,
    message: 'Successfully retrieved recipes',
    data: recipes,
  });
};

export const getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    res.status(404).json({
      message: 'Recipe not found',
    });
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully found recipe with id ${recipeId}',
    data: recipe,
  });
};
