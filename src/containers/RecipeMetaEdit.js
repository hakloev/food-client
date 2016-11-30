import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import RecipeMetaForm from '../components/RecipeMetaForm';

import { actions as recipeActions } from '../data/recipes';


class RecipeMetaEdit extends React.Component {
  constructor(props) {
    super(props);
    const { id } = props.recipe;
    this.formIdentifier = `edit-recipe-form-${id}`;
  }

  handleSubmit = formData => {
    const { recipe } = this.props;
    console.log('Edit Recipe', recipe.id);
    console.log('Edit recipe', formData);
    this.props.editRecipe(formData, recipe.id);
  }

  activateSubmit = () => {
    console.log('activate edit/submit edit recipe');
    console.log(this.props);
    this.props.handleFormSubmit(this.formIdentifier);
  }

  handleDelete = () => {
    const { recipe } = this.props;
    console.log('Remove Recipe', recipe.id);
    this.props.deleteRecipe(recipe.id);
  }

  render() {
    console.log('render meta edit');
    console.log('render meta edit props', this.props);

    const { recipe } = this.props;
    return (
      <RecipeMetaForm
        form={`edit-recipe-form-${recipe.id}`}
        initialValues={recipe}
        onSubmit={this.handleSubmit}
        handleDelete={this.handleDelete}
        handleEdit={this.activateSubmit}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRecipe: (recipe, id) => dispatch(recipeActions.editRecipe(recipe, id)),
    deleteRecipe: id => dispatch(recipeActions.deleteRecipe(id)),
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  }
}

export default connect(null, mapDispatchToProps)(RecipeMetaEdit);
