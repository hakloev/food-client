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

  addIngredientToList = (ingredientId, index) => {
    console.log('addIngredientToList', ingredientId, index);
    const newIngredient = Object.assign({}, {
      amount: '1',
      unit: Object.keys(INGREDIENT_UNITS)[0],
      preparation: 'Oppkuttet',
      ingredient_id: ingredientId,
    });
    console.log('addIngredientToList', newIngredient);
   
    this.setState({
      newIngredient,
    });
  }

  render() {
    console.log('render IngredientsAddContainer');
    console.log(this.props);

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
            formKey={`new-ingredient-form-${Math.random() * 1000}`}
            initialValues={newIngredient}
            removeIngredient={null}
            possibleIngredients={allIngredients}
          />
        }
      </div>
    )
  }
}