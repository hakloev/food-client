import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';
import debug from 'debug';

import MainLayout from './layout/MainLayout';
import HomePage from './containers/HomePage';
import RecipeDetail from './containers/RecipeDetail';
import RecipeList from './containers/RecipeList';
import RecipeEdit from './containers/RecipeEdit';
import PlanList from './containers/PlanList';
import PlanEdit from './containers/PlanEdit';
import PlanAdd from './containers/PlanAdd';
import PlanDetail from './containers/PlanDetail';
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
		path: 'recipes/:id/detail',
		label: 'Recipe',
		title: `${siteTitle} = Recipe`,
		component: RecipeDetail
	},
  planList: {
    path: 'plans',
    label: 'Plans',
    title: `${siteTitle} = Plans`,
    component: PlanList,
  },
  planAdd: {
    path: 'plans/add',
    label: 'Plan Add',
    title: `${siteTitle} = Plan Add`,
    component: PlanAdd,
  },
  planEdit: {
    path: 'plans/:id/edit',
    label: 'Plan Edit',
    title: `${siteTitle} = Plan Edit`,
    component: PlanEdit,
  },
  planDetail: {
    path: 'plans/:id/detail',
    label: 'Plan',
    title: `${siteTitle} = Plan`,
    component: PlanDetail,
  }
}

const indexRoute = (route) => Object.assign({}, route, { path: null });

export function makeRoutes() {
	return (
		<Route path="/" component={MainLayout}>
			<IndexRoute { ...indexRoute(routes.homepage) } />
      <Route { ...routes.recipeList } />
			<Route { ...routes.recipeDetail } />
			<Route { ...routes.recipeEdit } />
      <Route { ...routes.planList } />
      <Route { ...routes.planAdd } />
      <Route { ...routes.planEdit } />
      <Route { ...routes.planDetail } />
			<Route path="*" title ={`${siteTitle} - Page Not Found`} component={NotFound} />
		</Route>
	)
}
