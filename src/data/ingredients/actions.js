export const FETCH_INGREDIENTS_REQUEST = 'ingredients/REQUEST';
export const FETCH_INGREDIENTS_FAILURE = 'ingredients/FAILURE';
export const FETCH_INGREDIENTS_SUCCESS = 'ingredients/SUCCESS';

export const fetchAllIngredients = () => ({
  type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchAllIngredientsSuccess = ingredients => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  ingredients,
});

export const CREATE_INGREDIENT_REQUEST = 'ingredients/create/REQUEST';
export const CREATE_INGREDIENT_FAILURE = 'ingredients/create/FAILURE';
export const CREATE_INGREDIENT_SUCCESS = 'ingredients/create/SUCCESS';


export const createIngredient = name => ({
  type: CREATE_INGREDIENT_REQUEST,
  name,
});

export const createIngredientSuccess = payload => ({
  type: CREATE_INGREDIENT_SUCCESS,
  payload,
});

export const CREATE_RECIPE_INGREDIENT_REQUEST = 'ingredients/recipe/create/REQUEST';
export const CREATE_RECIPE_INGREDIENT_FAILURE = 'ingredients/recipe/create/FAILURE';
export const CREATE_RECIPE_INGREDIENT_SUCCESS = 'ingredients/recipe/create/SUCCESS';


export const createRecipeIngredient = (ingredient, recipeId) => ({
  type: CREATE_RECIPE_INGREDIENT_REQUEST,
  ingredient,
  recipeId,
});

export const createRecipeIngredientSuccess = payload => ({
  type: CREATE_RECIPE_INGREDIENT_SUCCESS,
  payload,
});

export const EDIT_RECIPE_INGREDIENT_REQUEST = 'ingredient/recipe/edit/REQUEST';
export const EDIT_RECIPE_INGREDIENT_FAILURE = 'ingredient/recipe/edit/FAILURE';
export const EDIT_RECIPE_INGREDIENT_SUCCESS = 'ingredient/recipe/edit/SUCCESS';

export const editRecipeIngredient = (ingredient, recipeId) => ({
  type: EDIT_RECIPE_INGREDIENT_REQUEST,
  ingredient,
  recipeId,
})

export const editRecipeIngredientSuccess = payload => ({
  type: EDIT_RECIPE_INGREDIENT_SUCCESS,
  payload,
})

export const DELETE_RECIPE_INGREDIENT_REQUEST = 'ingredient/recipe/delete/REQUEST';
export const DELETE_RECIPE_INGREDIENT_FAILURE = 'ingredient/recipe/delete/FAILURE';
export const DELETE_RECIPE_INGREDIENT_SUCCESS = 'ingredient/recipe/delete/SUCCESS';

export const deleteRecipeIngredient = (id, recipeId) => ({
  type: DELETE_RECIPE_INGREDIENT_REQUEST,
  id,
  recipeId,
});

export const deleteRecipeIngredientSuccess = payload => ({
  type: DELETE_RECIPE_INGREDIENT_SUCCESS,
  payload,
})
