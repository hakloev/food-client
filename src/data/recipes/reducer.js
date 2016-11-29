import { combineReducers } from 'redux';

import * as actions from './actions';

function all(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_RECIPES_SUCCESS:
      console.log('action', action)
      let recipes = {}
      for (let recipe in action.recipes) {
        recipes[recipe.id] = recipe
      }
      return {
        ...state,
        ...recipes,
      }
    case actions.FETCH_SINGLE_RECIPE_SUCCESS:
    case actions.CREATE_RECIPE_SUCCESS:
      console.log('recipe fetch success', action);
      const id = action.recipe.id;
      return {
        ...state,
        [id]: action.recipe,
      }
    default:
      return state;
  }
}

function byId(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_SINGLE_RECIPE_SUCCESS:
      return action.recipe;
    case actions.CREATE_RECIPE_SUCCESS:
      return action.recipe;
    default: 
      return state;
  }
}

function isFetching(state = false, action) {
  switch (action.type) {
    case actions.FETCH_RECIPES_REQUEST:
      return true;
    case actions.FETCH_RECIPES_FAILURE:
    case actions.FETCH_RECIPES_SUCCESS:
      return false;
    default:
      return state;
  }
}

function createModal(state = { open: false }, action) {
  switch (action.type) {
    case actions.HIDE_CREATE_MODAL:
      return Object.assign({}, state, {
        open: false,
      });
    case actions.SHOW_CREATE_MODAL:
      return Object.assign({}, state, {
        open: true,
      });
    default:
      return state;
  }
}

export default combineReducers({
  all,
  isFetching,
  createModal,
});