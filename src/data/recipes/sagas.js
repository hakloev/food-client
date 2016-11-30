import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import * as actions from './actions';

import ApiService from '../../api/fetch';

function* fetchRecipes(action) {
  try {
    const { json } = yield call(ApiService.get, '/api/recipes/');
    yield put(actions.fetchAllRecipesSuccess(json));
  } catch(error) {
    console.error('fetchRecipes error', error);
  }
}

function* fetchSingleRecipe(action) {
  try {
    const path = `/api/recipes/${action.id}/`;
    const { json } = yield call(ApiService.get, path);
    yield put(actions.fetchSingleRecipeSuccess(json, action.id));
  } catch (error) {
    console.error('fetchSingleRecipeError', error);
  }
}

function* createRecipe(action) {
  try {
    console.log('create recipe', action);
    const { json } = yield call(ApiService.post, '/api/recipes/', { body: action.recipe })
    console.log('response on create recipe', json);
    yield put(actions.createRecipeSuccess(json));
    yield put(actions.hideCreateModal());
    const redirectPath = `/recipes/${json.id}/edit/`;
    browserHistory.push(redirectPath);
  } catch (error) {
    console.error('createRecipeError', error);
  }
}

function* editRecipe(action) {
  try {
    console.log('edit recipe', action);
    const path = `/api/recipes/${action.id}/`;
    const { json } = yield call(ApiService.put, path, { body: action.recipe })
    console.log('response on edit recipe', json);
    yield put(actions.editRecipeSuccess(json));
  } catch (error) {
    console.error('editRecipeError', error);
  }
}

function* deleteRecipe(action) {
  try {
    console.log('delete recipe', action);
    const path = `/api/recipes/${action.id}/`;
    const response = yield call(ApiService.delete, path);
    console.log('response on delete recipe', response);
    yield put(actions.deleteRecipeSuccess(action.id));
  } catch (error) {
    console.error('deleteRecipeError', error);
  }
}

export function* watchRecipeSagas() {
  yield* [
    takeEvery(actions.FETCH_RECIPES_REQUEST, fetchRecipes),
    takeEvery(actions.FETCH_SINGLE_RECIPE_REQUEST, fetchSingleRecipe),
    takeEvery(actions.CREATE_RECIPE_REQUEST, createRecipe),
    takeEvery(actions.EDIT_RECIPE_REQUEST, editRecipe),
    takeEvery(actions.DELETE_RECIPE_REQUEST, deleteRecipe),
  ]
}
