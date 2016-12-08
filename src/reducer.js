import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as ingredients } from './data/ingredients';
import { reducer as plans } from './data/plans';
import { reducer as recipes } from './data/recipes';

const reducer = combineReducers({
  form: formReducer,
  ingredients,
  plans,
  recipes,
});

export default reducer;
