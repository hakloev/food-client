export const FETCH_RECIPES_REQUEST = 'recipes/REQUEST';
export const FETCH_RECIPES_FAILURE = 'recipes/FAILURE';
export const FETCH_RECIPES_SUCCESS = 'recipes/SUCCESS';

export const fetchAllRecipes = () => ({
  type: FETCH_RECIPES_REQUEST,
});

export const fetchAllRecipesSuccess = recipes => ({
  type: FETCH_RECIPES_SUCCESS,
  recipes,
});

export const FETCH_SINGLE_RECIPE_REQUEST = 'recipes/single/REQUEST';
export const FETCH_SINGLE_RECIPE_FAILURE = 'recipes/single/FAILURE';
export const FETCH_SINGLE_RECIPE_SUCCESS = 'recipes/single/SUCCESS';

export const fetchSingleRecipe = id => ({
  type: FETCH_SINGLE_RECIPE_REQUEST,
  id,
});

export const fetchSingleRecipeSuccess = (recipe, id) => ({
  type: FETCH_SINGLE_RECIPE_SUCCESS,
  recipe,
  id,
});

export const CREATE_RECIPE_REQUEST = 'recipes/create/REQUEST';
export const CREATE_RECIPE_FAILURE = 'recipes/create/FAILURE';
export const CREATE_RECIPE_SUCCESS = 'recipes/create/SUCCESS';

export const createRecipe = recipe => ({
  type: CREATE_RECIPE_REQUEST,
  recipe,
});

export const createRecipeSuccess = recipe => ({
  type: CREATE_RECIPE_SUCCESS,
  recipe,
});

export const EDIT_RECIPE_REQUEST = 'recipes/edit/REQUEST';
export const EDIT_RECIPE_FAILURE = 'recipes/edit/FAILURE';
export const EDIT_RECIPE_SUCCESS = 'recipes/edit/SUCCESS';

export const editRecipe = (recipe, id) => ({
  type: EDIT_RECIPE_REQUEST,
  recipe,
  id,
});

export const editRecipeSuccess = recipe => ({
  type: EDIT_RECIPE_SUCCESS,
  recipe,
});

export const DELETE_RECIPE_REQUEST = 'recipes/delete/REQUEST';
export const DELETE_RECIPE_FAILURE = 'recipes/delete/FAILURE';
export const DELETE_RECIPE_SUCCESS = 'recipes/delete/SUCCESS';

export const deleteRecipe = id => ({
  type: DELETE_RECIPE_REQUEST,
  id,
});

export const deleteRecipeSuccess = id => ({
  type: DELETE_RECIPE_SUCCESS,
  id,
});

export const SHOW_CREATE_MODAL = 'recipes/modal/SHOW';
export const HIDE_CREATE_MODAL = 'recipes/modal/HIDE';

export const showCreateModal = () => ({
  type: SHOW_CREATE_MODAL,
});

export const hideCreateModal = () => ({
  type: HIDE_CREATE_MODAL,
});
