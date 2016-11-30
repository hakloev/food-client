import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import * as actions from './actions';

import ApiService from '../../api/fetch';

function* fetchNewestPlan(action) {
  try {
    const { json } = yield call(ApiService.get, '/api/plan/latest/');
    yield put(actions.fetchNewestPlanSuccess(json));
  } catch(error) {
    console.error('fetchNewestPlanError error', error);
  }
}

export function* watchPlanSagas() {
  yield* [
    takeEvery(actions.FETCH_NEWEST_REQUEST, fetchNewestPlan),
  ]
}
