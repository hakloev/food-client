import React from 'react';

import IngredientForm from '../components/IngredientForm';
import { actions as ingredientsActions } from '../data/ingredients';
import { INGREDIENT_UNITS } from '../constants';

export default class IngredientsEditContainer extends React.Component {
  constructor(props) {
    super(props);
    const { ingredient } = this.props;
    this.formIdentifier = `edit-ingredient-form-${ingredient.id}`
  }

  handleSubmit = formData => {
    const { recipe, ingredient } = this.props;
    console.log('edit ingredient', recipe.id);
    console.log('edit ingredient', formData);
    // Replace ingredient with ingredient_id required to PUT edit
    const modifiedFormData = Object.assign({}, formData, {
      ingredient_id: ingredient.ingredient.id,
    });
    delete modifiedFormData['ingredient'];
    this.props.editIngredient(modifiedFormData, recipe.id);
    // TODO: call editrecipe actions
  }

  activateSubmit = () => {
    console.log('activate edit/submit edit ingredient');
    console.log(this.props);
    this.props.handleFormSubmit(this.formIdentifier);
  }

  handleDelete = () => {
    const { ingredient, recipe } = this.props;
    console.log('delete ingredient id ', ingredient.id, 'recipe ', recipe.id)
    this.props.deleteIngredient(ingredient.id, recipe.id);
  }

  render() {
    console.log('render ingredients edit container');
    console.log(this.props);

    const { ingredient } = this.props;
    console.log('render edit ing who', ingredient);
    const tempIngredient = Object.assign({}, ingredient, {
      ingredient: ingredient.ingredient.name,
    });
    console.log('render edit ing who2', tempIngredient);

    return (
      <IngredientForm
        key={tempIngredient.id}
        form={this.formIdentifier}
        initialValues={tempIngredient}
        onSubmit={this.handleSubmit}
        handleEdit={this.activateSubmit}
        handleDelete={this.handleDelete}
      />
    )
  }
}
