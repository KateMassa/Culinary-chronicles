import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';

import { getAllRecipes, getRecipeById } from './services/recipes.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Culinary chronicles!',
    });
  });

  app.get('/recipes', async (req, res) => {
    const recipes = await getAllRecipes();

    res.status(200).json({
      data: recipes,
    });
  });

  app.get('/recipes/:recipeId', async (req, res) => {
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

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
