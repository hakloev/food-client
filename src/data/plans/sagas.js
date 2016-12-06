import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import Momemt from 'moment';

import * as actions from './actions';

import ApiService from '../../api/fetch';

function* fetchPlan(action) {
  try {
    const path = `/api/plans/${action.id}/`
    const { json } = yield call(ApiService.get, path);
    yield put(actions.fetchPlanSuccess(json));
  } catch (error) {
    console.error('fetchPlanError', error);
  }
}

function* fetchNewestPlan(action) {
  try {
    const { json } = yield call(ApiService.get, '/api/plan/latest/');
    yield put(actions.fetchNewestPlanSuccess(json));
  } catch (error) {
    console.error('fetchNewestPlanError error', error);
  }
}

function* fetchAllPlans(action) {
  try {
    const { json } = yield call(ApiService.get, '/api/plans/');
    yield put(actions.fetchAllPlansSuccess(json));
  } catch (error) {
    console.error('fetchAllPlansError', error);
  }
}

function* createPlan(action) {
  try {
    let { plan } = action;

    plan = Object.assign({}, plan, {
      start_date: Momemt(plan.start_date).format('YYYY-MM-DD'),
    })

    const { json } = yield call(ApiService.post, '/api/plans/', { body: plan });
    console.log('createPlan response', json);
    yield put(actions.createPlanSuccess(json));
    browserHistory.push(`/plans/${json.id}/detail/`);
  } catch (error) {
    console.error('createPlanError', error);
  }
}

function* editPlan(action) {
  try {
    const path = `/api/plans/${action.id}/`;
    let { plan } = action;
    console.log(plan);
    plan = Object.assign({}, plan, {
      start_date: Momemt(plan.start_date).format('YYYY-MM-DD'),
    })

    const { json } = yield call(ApiService.put, path, { body: plan });
    console.log('editPlan response', json);
    yield put(actions.editPlanSuccess(json));
    browserHistory.push(`/plans/${json.id}/detail/`);
  } catch (error) {
    console.error('editPlanError', error);
  }
}


export function* watchPlansSagas() {
  yield* [
    takeEvery(actions.FETCH_PLAN_REQUEST, fetchPlan),
    takeEvery(actions.FETCH_NEWEST_REQUEST, fetchNewestPlan),
    takeEvery(actions.FETCH_ALL_REQUEST, fetchAllPlans),
    takeEvery(actions.CREATE_PLAN_REQUEST, createPlan),
    takeEvery(actions.EDIT_PLAN_REQUEST, editPlan),
  ]
}
