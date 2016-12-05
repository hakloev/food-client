import { fork } from 'redux-saga/effects';

import { sagas as ingredients } from './data/ingredients';
import { sagas as plans } from './data/plans';
import { sagas as recipes } from './data/recipes';

export default function* root() {
  yield [
    ingredients.watchIngredientsSagas(),
    plans.watchPlansSagas(),
    recipes.watchRecipeSagas(),
  ]
}
