import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import Moment from 'moment';

import { SelectField, TextField, DatePicker, Checkbox } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';

import { DAYS, INGREDIENT_UNITS, RECIPE_TYPES } from '../constants';


class RecipeIngredientsForm extends React.Component {

  render() {
    const { handleSubmit, allIngredients } = this.props;

    const ingredientOptions = allIngredients.map(ingredient => {
      return <MenuItem key={ingredient.id} value={ingredient.id} primaryText={ingredient.name} />
    })

    const unitOptions = Object.keys(INGREDIENT_UNITS).map((key) => {
      return <MenuItem key={key} value={key} primaryText={INGREDIENT_UNITS[key]} />
    });

    return (
       <form onSubmit={handleSubmit}>
        <div style={{ width: 1280, margin: 'auto' }}>
          <FieldArray name="ingredients" component={ingredients => (
            <ul style={{ listStyle: 'none' }}>
              {ingredients.fields.map((ingredient, index) => {
                return <li key={index}>
                  <IconButton onClick={() => ingredients.fields.remove(index)} disableTouchRipple={true}>
                    <IconDelete />
                  </IconButton>
                  <Field
                    name={`${ingredient}.ingredient_id`}
                    component={SelectField}
                    label="Ingredient"
                  >
                    {ingredientOptions}
                  </Field>
                  <Field
                    name={`${ingredient}.amount`}
                    component={TextField}
                    type="number"
                    label="Amount"
                  />
                  <Field
                    name={`${ingredient}.unit`}
                    component={SelectField}
                  >
                    {unitOptions}
                  </Field>
                  <Field
                    name={`${ingredient}.preparation`}
                    component={TextField}
                    label="Preparation"
                  />
                </li>
              })}
              <li>
                <RaisedButton primary={true} onTouchTap={() => ingredients.fields.push({})} label="Add ingredient" />
              </li>
            </ul>
          )} />
        </div>
      </form>
    )
  }
}

RecipeIngredientsForm = reduxForm({
  form: 'edit-recipe-ingredients',
  destroyOnUnmount: false,

})(RecipeIngredientsForm);

export default RecipeIngredientsForm;
