import { fork } from 'redux-saga/effects';

import { sagas as ingredients } from './data/ingredients';
import { sagas as plan } from './data/plan';
import { sagas as recipes } from './data/recipes';

export default function* root() {
  yield [
    ingredients.watchIngredientsFetch(),
    ingredients.watchCreateRecipe(),
    plan.watchNewestPlan(),
    recipes.watchRecipeFetch(),
    recipes.watchSingleRecipeFetch(),
    recipes.watchCreateRecipe(),
  ]
}