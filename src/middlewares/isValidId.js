import { isValidObjectId } from 'mongoose';

import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { recipeId } = req.params;
  if (!recipeId || !isValidObjectId(recipeId)) {
    next(createHttpError(404, 'Not found'));
  }

  next();
};
