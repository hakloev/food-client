import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import debug from 'debug';

import configureStore from './configureStore';
import HMRContainer from './containers/HMRContainer';
import { actions as recipeActions } from './data/recipes';
import { actions as plansActions } from './data/plans';


require('../styles/main.scss');

debug.enable();

const log = debug('client:index.js');
log('Client environment', process.env);

const store = configureStore();
const rootEl = document.getElementById('root')

// Prefetch all recipes
store.dispatch(recipeActions.fetchAllRecipes());
store.dispatch(plansActions.fetchAllPlans());

const App = (
	<HMRContainer>
		<Root store={store} />
	</HMRContainer>
)

try {
  ReactDOM.render(App, rootEl);
  if (module.hot) {
    module.hot.accept('./Root', () => {
      const NextApp = require('./Root').default;
      ReactDOM.render(
        <HMRContainer>
          <NextApp store={store} />
        </HMRContainer>,
        rootEl
      );
    });
  }
} catch (err) {
  log('Render error', err);
}

export default App;
