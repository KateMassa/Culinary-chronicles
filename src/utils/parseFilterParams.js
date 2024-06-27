const parseString = (value) => {
  return typeof value === 'string' ? value.trim() : undefined;
};

const parseNumber = (value) => {
  const parsedValue = parseInt(value);
  return !isNaN(parsedValue) ? parsedValue : undefined;
};

const parseDate = (value) => {
  const parsedDate = Date.parse(value);
  return !isNaN(parsedDate) ? new Date(parsedDate) : undefined;
};

export const parseFilterParams = (query) => {
  const { title, ingredients, cookingTime, createdAt } = query;

  const parsedTitle = parseString(title);
  const parsedIngredients = parseString(ingredients); // Assuming ingredients is a string separated by comma or space
  const parsedCookingTime = parseNumber(cookingTime);
  const parsedCreatedAt = parseDate(createdAt);

  return {
    title: parsedTitle,
    ingredients: parsedIngredients,
    cookingTime: parsedCookingTime,
    createdAt: parsedCreatedAt,
  };
};
