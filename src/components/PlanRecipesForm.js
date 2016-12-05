import React from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import Moment from 'moment';

import { SelectField, TextField, DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';

import { DAYS } from '../constants';

const styles = {}

class PlanRecipesForm extends React.Component {
  constructor(props) {
    console.log('plan recipes form', props);
    super(props);
  }

  render() {
    console.log('plan recipes form render');
    console.log('plan recipes form render props', this.props);

    const { handleSubmit } = this.props;

    return (
       <form onSubmit={handleSubmit}>
        <div>
          <FieldArray name="items" component={recipes =>
             <ul>
              <li>
                <RaisedButton onTouchTap={() => recipes.fields.push()}>Add Recipe</RaisedButton>
              </li>
              {recipes.fields.map((recipe, index) =>
                <li key={index}>
                  <IconButton onClick={() => recipes.fields.remove(index) } disableTouchRipple={true}>
                    <IconDelete />
                  </IconButton>
                  <Field
                    name={`${recipe}.day`}
                    component={SelectField}
                    label="Day"
                    floatingLabelText="Day"
                    value={index}
                  >
                    {Object.keys(DAYS).map(day =>
                      <MenuItem key={day} value={day} primaryText={DAYS[day]} />
                    )}
                  </Field>
                  <Field
                    name={`${recipe}.recipe_id`}
                    component={SelectField}
                    label="Recipe"
                    floatingLabelText="Recipe"
                  >
                    {Object.keys(this.props.recipes).map(recipe => {
                      return <MenuItem key={recipe} value={recipe} primaryText={this.props.recipes[recipe].name} />
                    })}
                  </Field>
                </li>
              )}
            </ul>
          } />
        </div>
      </form>
    )
  }
}

PlanRecipesForm = reduxForm({
  form: 'add-plan',
  destroyOnUnmount: false
})(PlanRecipesForm);


// const selector = formValueSelector('add-plan');
// PlanRecipesForm = connect(state => {
//   const recipes = selector(state, 'recipes')
//   return {
//     recipes,
//   }
// })(PlanRecipesForm);

export default PlanRecipesForm;
