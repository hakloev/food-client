import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { actions as plansActions } from '../data/plans';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ApiService from '../api/fetch';

const dayTranslate = {
	0: 'Monday',
	1: 'Tuesday',
	2: 'Wednesday',
	3: 'Thursday',
	4: 'Friday',
	5: 'Saturday',
	6: 'Sunday',
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.props.fetchNewestPlan();
	}

  render() {
    return (
			<div className="week-plan">
	    	{ Object.keys(this.props.plan).length > 0
					? this.props.plan.days.sort((day, other) => day.day > other.day).map(day => {
						console.log(day);
						return <Card className="day-card">
							<CardHeader
								title={dayTranslate[day.day]}
								subtitle={<Link to={`recipes/${day.recipe.id}/detail/`}>{day.recipe.name}</Link>}
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
	console.log(state);
	return {
		plan: state.plans.latest,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchNewestPlan: () => dispatch(plansActions.fetchNewestPlan()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
