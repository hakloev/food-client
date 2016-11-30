import React from 'react';

import IngredientForm from '../components/IngredientForm';
import IngredientsSearchBar from '../components/IngredientsSearchBar';

import { actions as ingredientsActions } from '../data/ingredients';

import { INGREDIENT_UNITS } from '../constants';

export default class IngredientsAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newIngredient: null,
    }
  }

  handleSubmit = formData => {
    const { recipe } = this.props;
    console.log('add ingredient recipe id', recipe.id);
    console.log('add ingredient form data', formData);
    this.props.addIngredient(formData, recipe.id);
    this.setState({
      newIngredient: null,
    })
    // TODO: call editrecipe actions
  }

  addIngredientToList = (ingredientId, index) => {
    console.log('addIngredientToList', ingredientId, index);
    const ingredientObj = this.props.allIngredients.find(i => i.id === ingredientId)
    const newIngredient = Object.assign({}, {
      amount: '1',
      unit: Object.keys(INGREDIENT_UNITS)[0],
      preparation: 'Oppkuttet',
      ingredient_id: ingredientId,
      ingredient: ingredientObj.name,
    });
    console.log('addIngredientToList', newIngredient);

    this.setState({
      newIngredient,
    });
  }

  render() {
    console.log('render IngredientsAddContainer');
    console.log('render IngredientsAddContainer props', this.props);

    const { allIngredients } = this.props;
    const { newIngredient } = this.state;

    return (
      <div>
        <IngredientsSearchBar
          ingredients={allIngredients}
          addIngredient={this.addIngredientToList}
        />
        {newIngredient &&
          <IngredientForm
            isNewIngredient
            form={`new-ingredient-form-${Math.random() * 1000}`}
            initialValues={newIngredient}
            onSubmit={this.handleSubmit}
            removeIngredient={null}
            possibleIngredients={allIngredients}
          />
        }
      </div>
    )
  }
}
