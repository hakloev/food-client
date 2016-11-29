import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import debug from 'debug';

import MainLayout from './layout/MainLayout';
import HomePage from './containers/HomePage';
import Recipe from './containers/Recipe';
import RecipeList from './containers/RecipeList';
import RecipeEdit from './containers/RecipeEdit';
// import RecipeForm from './components/RecipeCreate';
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
  recipeList: {
    path: 'recipes',
    label: 'Recipes',
    title: `${siteTitle} = Recipes`,
    component: RecipeList,
  },
	recipeEdit: {
    path: 'recipes/:id/edit',
    label: 'Create Recipe',
    title: `${siteTitle} = Create Recipe`,
    component: RecipeEdit,
  },
	recipeDetail: {
		path: 'recipes/:id/view',
		label: 'Recipe',
		title: `${siteTitle} = Recipe`,
		component: Recipe
	},
}

const indexRoute = (route) => Object.assign({}, route, { path: null });

export function makeRoutes() {
	return (
		<Route path="/" component={MainLayout}>
			<IndexRoute { ...indexRoute(routes.homepage) } />
      <Route { ...routes.recipeList } />
			<Route { ...routes.recipeDetail } />
			<Route { ...routes.recipeEdit } />
			<Route path="*" title ={`${siteTitle} - Page Not Found`} component={NotFound} />
		</Route>
	)
}
