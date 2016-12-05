import { combineReducers } from 'redux';

import * as actions from './actions';

function latest(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_NEWEST_SUCCESS:
    case actions.CREATE_PLAN_SUCCESS:
      console.log(action.plan);
      return action.plan ? action.plan : state
    default:
      return state;
  }
}

function all(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_ALL_SUCCESS:
      console.log(action);
      let plans = {}
      action.plans.forEach(p => {
        plans[p.id] = p;
      });
      return {
        ...state,
        ...plans,
      }
    case actions.CREATE_PLAN_SUCCESS:
    case actions.FETCH_PLAN_SUCCESS:
      return {
        ...state,
        [action.plan.id]: action.plan,
      }
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case actions.FETCH_NEWEST_REQUEST:
      return true;
    case actions.FETCH_NEWEST_FAILURE:
    case actions.FETCH_NEWEST_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  latest,
  all,
  isFetching,
});
