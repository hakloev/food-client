import React from 'react';
import ApiService from '../api/fetch';


export default class Recipe extends React.Component {

	constructor(props) {
		super(props);
		console.log(props);

		this.API_URL = `/api/recipes/${props.params.id}`;

		this.state = {
			recipe: null,
		}

		const data = ApiService.get(this.API_URL)
			.then(({ json }) => {
				console.log(json);
				this.setState({
					recipe: json
				});
			});
	}

	render() {
		if (this.state.recipe === null) {
			return <p>Loading...</p>
		}

		return (
			<p>{this.state.recipe.name}</p>
		)
	}

}
