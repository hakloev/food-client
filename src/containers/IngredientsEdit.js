import React from 'react';
import { connect} from 'react-redux';
import { submit } from 'redux-form';

import IngredientsAddContainer from './IngredientsAddContainer';
import IngredientsEditContainer from './IngredientsEditContainer';

import { actions as ingredientsActions } from '../data/ingredients';

class IngredientsEdit extends React.Component {
  constructor(props) {
    super(props);
    console.log('IngredientsEdit props in constructor', this.props);
  }

  handleSubmit = formData => {
    const { recipe } = this.props;
    console.log('Edit Recipe', recipe.id);
    console.log('Edit recipe', formData);
    // TODO: call editrecipe actions
  }

  handleDelete = event => {
    const { recipe } = this.props;
    console.log('Remove Recipe', recipe.id);
    // TODO: call removerecipe action
  }

  render() {
    console.log('render ingredients edit');
    console.log('render ingredients edit props', this.props);

    const {
      addIngredient,
      allIngredients,
      recipeIngredients,
      recipe,
      editIngredient,
      deleteIngredient,
      handleFormSubmit
    } = this.props;

    const ingredients = recipeIngredients.sort((a, b) => b.id - a.id).map(i => {
      console.log('render rec ing', i);
      return <div key={`${i.id}`}>
        <IngredientsEditContainer
          ingredient={i}
          recipe={recipe}
          editIngredient={editIngredient}
          deleteIngredient={deleteIngredient}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    })

    return (
      <div>
        <IngredientsAddContainer
          recipe={recipe}
          addIngredient={addIngredient}
          allIngredients={allIngredients}
        />
        {ingredients.length > 0
          ? ingredients
          : <h1>No ingredients for this recipe</h1>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (formData, recipeId) => dispatch(ingredientsActions.createRecipeIngredient(formData, recipeId)),
    editIngredient: (formData, recipeId) => dispatch(ingredientsActions.editRecipeIngredient(formData, recipeId)),
    deleteIngredient: (id, recipeId) => dispatch(ingredientsActions.deleteRecipeIngredient(id, recipeId)),
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  }
}


export default connect(null, mapDispatchToProps)(IngredientsEdit);
