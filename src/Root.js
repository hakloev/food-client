import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';

import { makeRoutes } from './routes';

export default class Root extends Component {
	render() {
		return <Router children={makeRoutes()} history={browserHistory} />;
	}
}
