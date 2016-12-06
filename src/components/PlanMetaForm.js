import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Moment from 'moment';

import { SelectField, TextField, DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'

const disableAllButMonday = date => date.getDay() !== 1;

class PlanMetaForm extends React.Component {

  handleDateFormat = date => Moment(date).format('W');

  render() {
    const { fields, handleSubmit, isNewPlan, handleEdit, handleDelete } = this.props;

    return (
       <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="start_date"
            component={DatePicker}
            container="inline"
            mode="landscape"
            shouldDisableDate={disableAllButMonday}
            floatingLabelText="For week"
            formatDate={this.handleDateFormat}
            format={(value, name) => {
              return value === undefined ? new Date() : new Date(value);
            }}
          />
          {!isNewPlan &&
            <Field
              name="cost"
              component={TextField}
              type="number"
              floatingLabelText="Cost"
            />
          }
        </div>
      </form>
    )
  }
}

PlanMetaForm = reduxForm({
  form: 'add-plan',
  destroyOnUnmount: false,
})(PlanMetaForm);

export default PlanMetaForm;
