import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { makeRoutes } from './routes';

injectTapEventPlugin();

export default class Root extends Component {
	render() {
    const store = this.props.store;

		return <Provider store={store}>
      <Router history={browserHistory}>
        {makeRoutes()}
      </Router>
    </Provider>
	}
}
