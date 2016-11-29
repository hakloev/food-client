import React from 'react';

import RecipeMetaForm from '../components/RecipeMetaForm';

import { actions as recipeActions } from '../data/recipes';


export default class RecipeMetaEdit extends React.Component {
  
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
    console.log('render meta edit');
    console.log(this.props);

    const { recipe } = this.props;
    return (
      <RecipeMetaForm 
        formKey={`edit-recipe-form-${recipe.id || Math.random()}`}
        initialValues={recipe}
        onSubmit={this.onSubmit} 
        onDelete={this.onDelete} 
      />
    )
  }

}