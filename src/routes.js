import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import debug from 'debug';

import MainLayout from './layout/MainLayout';
import HomePage from './containers/HomePage';
import Recipe from './components/Recipe';
import NotFound from './components/NotFound';

debug('client:routes');

const siteTitle = 'food client';

export const routes = {
	homepage: {
		path: '/',
		label: 'Home',
		title: `${siteTitle} = Home`,
		component: HomePage
	},
	recipe: {
		path: '/recipe/:id/',
		label: 'Recipe',
		title: `${siteTitle} = Recipe`,
		component: Recipe
	}
}

const indexRoute = (route) => Object.assign({}, route, { path: null });

export function makeRoutes() {
	console.log(indexRoute(routes.homepage));
	return (
		<Route path="/" component={MainLayout}>
			<IndexRoute { ...indexRoute(routes.homepage) } />
			<Route { ...routes.recipe } />
			<Route path="*" title ={`${siteTitle} - Page Not Found`} component={NotFound} />
		</Route>
	)
}
