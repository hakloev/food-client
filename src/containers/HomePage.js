import React from 'react';
import debug from 'debug';
import ApiService from '../api/fetch';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

debug('client:HomePage');

const dayTranslate = {
	0: 'Monday',
	1: 'Tuesday',
	2: 'Wednesday',
	3: 'Thursday',
	4: 'Friday',
	5: 'Saturday',
	6: 'Sunday',
}

export default class HomePage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			plan: {},
		};

		const data2 = ApiService.get('/api/plan/latest/')
			.then(({ json }) => {
				console.log(json);
				this.setState({
					plan: json,
				});
			})
	}

  render() {
    return (
			<div>
	    	{ Object.keys(this.state.plan).length > 0
					? this.state.plan.days.sort((day, other) => day.day > other.day).map(day => {
						console.log(day);
						return <Card>
							<CardHeader
								title={dayTranslate[day.day]}
								subtitle={day.recipe.name}
							/>
						</Card>
					})
					: 'No plan...'
				}
			</div>
    );
  }
}
