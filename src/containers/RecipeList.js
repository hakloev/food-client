import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import RecipeCard from '../components/RecipeCard';
import RecipeAddButton from '../components/RecipeAddButton';

class RecipeList extends React.Component {
  state = {
    query: '',
  }

  handleChange = event => {
    event.preventDefault();

    this.setState({
      query: event.target.value,
    });
  }

  render() {

    const { recipes, isFetching } = this.props;

    let filteredRecipes = {};

    if (this.state.query !== '') {
      Object.keys(recipes).forEach(recipeId => {
        if (recipes[recipeId].name.toLowerCase().includes(this.state.query.toLowerCase())) {
          filteredRecipes[recipeId] = recipes[recipeId];
        }
      })
    } else {
      filteredRecipes = recipes;
    }

    return (
      <div>
        <h1>Recipes:</h1>
        <div>
          <TextField
            label="Search recipes"
            floatingLabelText="Search recipes"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </div>
        <div>
          {!isFetching && Object.keys(filteredRecipes).map(recipeId => {
            return <RecipeCard key={recipeId} recipe={recipes[recipeId]} />
          })}
        </div>
        <RecipeAddButton />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes.all,
    isFetching: state.recipes.isFetching,
  }
}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps)(RecipeList);
