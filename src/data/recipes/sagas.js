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

export function* watchRecipeFetch() {
  yield* takeEvery(actions.FETCH_RECIPES_REQUEST, fetchRecipes);
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

export function* watchSingleRecipeFetch() {
  yield* takeEvery(actions.FETCH_SINGLE_RECIPE_REQUEST, fetchSingleRecipe);
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

export function* watchCreateRecipe() {
  yield* takeEvery(actions.CREATE_RECIPE_REQUEST, createRecipe);
}
