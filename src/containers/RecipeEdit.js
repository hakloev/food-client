import React from 'react';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';

import RecipeMetaEdit from './RecipeMetaEdit';
import IngredientsEdit from './IngredientsEdit';

import { actions as ingredientsActions } from '../data/ingredients';
import { actions as recipeActions } from '../data/recipes';

class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      recipe: Object.assign({}, this.props.recipe),
    }

    this.props.fetchIngredients();
  }

  componentDidMount() {
    console.log('recipe edit didMount')
    console.log(this.props.recipe);
    if (this.props.recipe && this.props.recipe.id === undefined) {
      console.log('fetch recipe', this.props.params.id);
      this.props.fetchRecipe(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe !== nextProps.recipe) {
      this.setState({
        recipe: Object.assign({}, nextProps.recipe),
      });
    }
  }
  
  render() {
    console.log('recipe edit');
    console.log('bfg', this.state);
    const { 
      allIngredients, 
      recipe: {  
        ingredients, steps, ...recipeMetaData 
      } 
    } = this.props;

    return (
      <div>
        <div>
          <h1>Recipe: {recipeMetaData.name} - edit</h1>
        </div>
        <div>
          <RecipeMetaEdit recipe={recipeMetaData} />
        </div>
        <Divider />
        <div>
          <IngredientsEdit 
            allIngredients={allIngredients}
            recipeIngredients={ingredients}
            recipe={recipeMetaData}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('recipe edit state', state, ownProps);
  let id = parseInt(ownProps.params.id || 0);
  console.log(id);
  const recipe = (id != 0 && state.recipes.all[id] !== undefined) ? state.recipes.all[id] : {};
  console.log('state', recipe); 
  return {
    recipe,
    allIngredients: state.ingredients.all,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipe: id => dispatch(recipeActions.fetchSingleRecipe(id)),
    fetchIngredients: () => dispatch(ingredientsActions.fetchAllIngredients()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);
