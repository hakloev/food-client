import React from 'react';

import IngredientsAddContainer from './IngredientsAddContainer';

import { actions as ingredientsActions } from '../data/ingredients';


export default class IngredientsEdit extends React.Component {
  
  onSubmit = formData => {
    const { recipe } = this.props;
    console.log('Edit Recipe', recipe.id);
    console.log('Edit recipe', formData);
    // TODO: call editrecipe actions
  }

  onDelete = event => {
    const { recipe } = this.props;
    console.log('Remove Recipe', recipe.id);
    // TODO: call removerecipe action
  }

  render() {
    console.log('render ingredients edit');
    console.log(this.props);

    const { allIngredients, recipeIngredients, recipe } = this.props;
    return (
      <IngredientsAddContainer 
        recipe={recipe}
        allIngredients={allIngredients}
      />
    );
  }

}