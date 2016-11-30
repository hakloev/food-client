import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { SelectField, TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/image/edit';
import RaisedButton from 'material-ui/RaisedButton';

import { INGREDIENT_UNITS } from '../constants';

class IngredientForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('ingredientform constructor', this.props);
  }

  render() {
    console.log('IngredientForm render', this.props);
    console.log('IngredientForm render', this.state);

    const { isNewIngredient, handleSubmit, handleEdit, handleDelete } = this.props;

    const unitOptions = Object.keys(INGREDIENT_UNITS).map((key) => {
      return <MenuItem key={key} value={key} primaryText={INGREDIENT_UNITS[key]} />
    });

    return (
      <form onSubmit={handleSubmit} style={{display: 'inline-block'}}>
        <Field name="ingredient" label="Ingredient" floatingLabelText="Ingredient" component={TextField} disabled />
        <Field name="amount" type="number" label="Amount" component={TextField} />
        <Field name="unit" component={SelectField} hintText="Unit" floatingLabelText="Unit">
          {unitOptions}
        </Field>
        <Field name="preparation" label="Preparation" floatingLabelText="Preparation" component={TextField} />
        {isNewIngredient
          ? <RaisedButton primary={true} type="submit" label="Add" />
          : <div>
              <IconButton onClick={handleEdit} disableTouchRipple={true}>
                <IconEdit />
              </IconButton>
              <IconButton onClick={handleDelete} disableTouchRipple={true}>
                <IconDelete />
              </IconButton>
            </div>
        }
      </form>
    )
  }
}

IngredientForm = reduxForm({
  form: 'ingredient',
  enableReinitialize: true,
})(IngredientForm);

export default IngredientForm;
