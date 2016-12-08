import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions as plansActions } from '../data/plans';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ApiService from '../api/fetch';

import { DAYS } from '../constants';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.props.fetchNewestPlan();
	}

  render() {
    const { plan, recipes } = this.props;

    return (
			<div className="week-plan">
	    	{ Object.keys(plan).length > 0
					? plan.items.sort((day, other) => day.day > other.day).map(day => {
						console.log(day);
						return <Card key={day.id} className="day-card">
							<CardHeader
								title={DAYS[day]}
								subtitle={<Link to={`recipes/${day.recipe_id}/detail/`}>{recipes[day.recipe_id].name}</Link>}
							/>
						</Card>
					})
					: 'No plan...'
				}
			</div>
    );
  }
}

const mapStateToProps = state => {
	return {
		plan: state.plans.latest,
    recipes: state.recipes.all,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchNewestPlan: () => dispatch(plansActions.fetchNewestPlan()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
