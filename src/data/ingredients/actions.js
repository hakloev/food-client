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
