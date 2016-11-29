import { combineReducers } from 'redux';

import * as actions from './actions';

function latest(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_NEWEST_SUCCESS:
      console.log(action.plan);
      return action.plan ? action.plan : state
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
  isFetching,
});