import { combineReducers } from 'redux';

import * as actions from './actions';

function all(state = [], action) {
  switch (action.type) {
    case actions.FETCH_INGREDIENTS_SUCCESS:
      console.log('FETCH_INGREDIENTS_SUCCESS', action);
      return [...action.ingredients];
    case actions.CREATE_INGREDIENT_SUCCESS:
      return [...state, action.payload]
    default:
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case actions.FETCH_INGREDIENTS_REQUEST:
      return true;
    case actions.FETCH_INGREDIENTS_FAILURE:
    case actions.FETCH_INGREDIENTS_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  all,
  isFetching,
});