import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import debug from 'debug';

import configureStore from './configureStore';
import HMRContainer from './containers/HMRContainer';

require('../styles/main.scss');

debug.enable();

const log = debug('client:index.js');
log('Client environment', process.env);

const store = configureStore();
const rootEl = document.getElementById('root')

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
