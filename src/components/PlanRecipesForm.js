import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Moment from 'moment';

import { SelectField, TextField, DatePicker, Checkbox } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';

import { DAYS } from '../constants';


class PlanRecipesForm extends React.Component {

  // TODO: create addRecipe(fields) that pushes default dictionary to fields
  // https://github.com/jgretz/zen-express/blob/56ed2cf824f33bbcec7d22b555855fa2a6f94919/src/admin/src/components/schema/edit_schema.js#L47

  render() {
    const { handleSubmit, isNewPlan } = this.props;

    return (
       <form onSubmit={handleSubmit}>
        <div style={{ width: 1280, margin: 'auto' }}>
          <FieldArray name="items" component={items => (
            <ul style={{ listStyle: 'none' }}>
              {items.fields.map((item, index) => {
                return <li key={index}>
                  <Field
                    name={`${item}.day`}
                    component={SelectField}
                    label="Day"
                    disabled={true}
                    floatingLabelText="Day"
                  >
                    {Object.keys(DAYS).map(day => {
                      return <MenuItem key={day} value={parseInt(day)} primaryText={DAYS[day]} />
                    })}
                  </Field>
                  <Field
                    name={`${item}.recipe_id`}
                    component={SelectField}
                    label="Recipe"
                    floatingLabelText="Recipe"
                  >
                    {Object.keys(this.props.recipes).map(recipe => {
                      return <MenuItem key={recipe} value={parseInt(recipe)} primaryText={this.props.recipes[recipe].name} />
                    })}
                  </Field>
                  {!isNewPlan &&
                    <Field
                      name={`${item}.eaten`}
                      component={Checkbox}
                      label="Eaten"
                    />
                  }
                </li>
              })}
            </ul>
          )} />
        </div>
      </form>
    )
  }
}

PlanRecipesForm = reduxForm({
  form: 'add-plan',
  destroyOnUnmount: false,
})(PlanRecipesForm);

export default PlanRecipesForm;
