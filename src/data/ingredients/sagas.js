import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import * as actions from './actions';

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

export function* watchIngredientsFetch() {
  yield* takeEvery(actions.FETCH_INGREDIENTS_REQUEST, fetchIngredients);
}

function* createIngredient(action) {
  try {
    const { json } = yield call(ApiService.post, '/api/ingredients/', { body: { name: action.name }});
    console.log(json);
    yield put(actions.createIngredientSuccess(json));
  } catch (error) {
    console.log('createIngredientError', error);
  }
}

export function* watchCreateRecipe() {
  yield* takeEvery(actions.CREATE_INGREDIENT_REQUEST, createIngredient);
}
