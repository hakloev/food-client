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


class RecipeStepsForm extends React.Component {

  render() {
    const { handleSubmit, allIngredients } = this.props;

    return (
       <form onSubmit={handleSubmit}>
        <div style={{ width: 1280, margin: 'auto' }}>
          <FieldArray name="steps" component={steps => (
            <ul style={{ listStyle: 'none' }}>
              {steps.fields.map((step, index) => {
                return <li key={index}>
                  <IconButton onClick={() => steps.fields.remove(index)} disableTouchRipple={true}>
                    <IconDelete />
                  </IconButton>
                  <Field
                    name={`${step}.step_number`}
                    component={TextField}
                    type="number"
                    label="Step"
                  />
                  <Field
                    name={`${step}.description`}
                    component={TextField}
                    multiLine={true}
                    rows={2}
                    label="Description"
                  />
                </li>
              })}
              <li>
                <RaisedButton primary={true} onTouchTap={() => steps.fields.push({})} label="Add step" />
              </li>
            </ul>
          )} />
        </div>
      </form>
    )
  }
}

RecipeStepsForm = reduxForm({
  form: 'edit-recipe-steps',
  destroyOnUnmount: false,
})(RecipeStepsForm);
// Do not use enableReinitialize, instead ensure that the initalData is present

export default RecipeStepsForm;
