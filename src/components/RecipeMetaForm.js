import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { SelectField, TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem'

import { RECIPE_TYPES, INGREDIENT_UNITS } from '../constants';


class RecipeMetaForm extends React.Component {

  render() {
    const { handleSubmit, isNewRecipe, handleEdit, handleDelete } = this.props;

    return (
       <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="name"
            floatingLabelText="Name"
            component={TextField}
            label="Name"
            fullWidth={true}
          />
        </div>
        <div>
          <Field
            name="website"
            type="url"
            floatingLabelText="Website"
            component={TextField}
            label="Website"
            fullWidth={true}
          />
        </div>
        <div>
          <Field
            name="type"
            component={SelectField}
            hintText="Type"
            floatingLabelText="Type"
            fullWidth={true}
          >
            {Object.keys(RECIPE_TYPES).map(key => {
              return <MenuItem key={key} value={key} primaryText={RECIPE_TYPES[key]} />
            })}
          </Field>
        </div>
      </form>
    )
  }
}

RecipeMetaForm = reduxForm({
  form: 'recipe',
  destroyOnUnmount: false,
})(RecipeMetaForm);

export default RecipeMetaForm;
