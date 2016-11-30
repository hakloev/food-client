import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import * as actions from './actions';
import { actions as recipeActions } from '../recipes';

import ApiService from '../../api/fetch';

function* fetchIngredients(action) {
  try {
    const { json } = yield call(ApiService.get, '/api/ingredients/');
    console.log('fetch result', json);
    yield put(actions.fetchAllIngredientsSuccess(json));
  } catch(error) {
    console.error('fetchIngredientsError', error);
  }
}

function* createIngredient(action) {
  try {
    const { json } = yield call(ApiService.post, '/api/ingredients/', { body: { name: action.name }});
    console.log('create ingredient', json);
    yield put(actions.createIngredientSuccess(json));
  } catch (error) {
    console.log('createIngredientError', error);
  }
}

function* createRecipeIngredient(action) {
  try {
    const path = `/api/recipes/${action.recipeId}/ingredients/`;
    const { json } = yield call(ApiService.post, path, { body: { ...action.ingredient }});
    console.log('create recipe ingredient', json);
    yield put(actions.createRecipeIngredientSuccess(json));
    yield put(recipeActions.fetchSingleRecipe(action.recipeId));
  } catch (error) {
    console.log('createRecipeIngredient', error);
  }
}

function* editRecipeIngredient(action) {
  try {
    console.log('edit recipe ingredient', action);
    const path = `/api/recipes/${action.recipeId}/ingredients/${action.ingredient.id}/`;
    const { json } = yield call(ApiService.put, path, { body: action.ingredient })
    console.log('response on edit recipe ingredient', json);
    yield put(actions.editRecipeIngredientSuccess(json));
  } catch (error) {
    console.error('editRecipeIngredientError', error);
  }
}

function* deleteRecipeIngredient(action) {
  try {
    console.log('delete recipe ingredient', action);
    const path = `/api/recipes/${action.recipeId}/ingredients/${action.id}/`;
    const response = yield call(ApiService.delete, path);
    yield put(actions.deleteRecipeIngredientSuccess(action.id));
  } catch (error) {
    console.error('deleteRecipeIngredientError', error);
  }
}

export function* watchIngredientsSagas() {
  yield* [
    takeEvery(actions.FETCH_INGREDIENTS_REQUEST, fetchIngredients),
    takeEvery(actions.CREATE_INGREDIENT_REQUEST, createIngredient),
    takeEvery(actions.CREATE_RECIPE_INGREDIENT_REQUEST, createRecipeIngredient),
    takeEvery(actions.EDIT_RECIPE_INGREDIENT_REQUEST, editRecipeIngredient),
    takeEvery(actions.DELETE_RECIPE_INGREDIENT_REQUEST, deleteRecipeIngredient),
  ]
}
