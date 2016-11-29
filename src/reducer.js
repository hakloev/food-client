import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';


import { reducer as ingredients } from './data/ingredients';
import { reducer as plan } from './data/plan';
import { reducer as recipes } from './data/recipes';

const reducer = combineReducers({
  form: formReducer,
  ingredients,
  plan,
  recipes,
});

export default reducer;