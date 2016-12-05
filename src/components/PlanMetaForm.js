import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Moment from 'moment';

import { SelectField, TextField, DatePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem'

const styles = {}

function disableAllButMonday(date) {
  return date.getDay() !== 1
}

class PlanMetaForm extends React.Component {
  constructor(props) {
    console.log('plan meta form', props);
    super(props);
  }

  handleDateFormat = (date) => {
    return Moment(date).format('W');
  }

  render() {
    console.log('plan form render');
    console.log('plan form render props', this.props);

    const { handleSubmit, isNewPlan, handleEdit, handleDelete } = this.props;

    return (
       <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="start_date"
            component={DatePicker}
            shouldDisableDate={disableAllButMonday}
            floatingLabelText="For week:"
            formatDate={this.handleDateFormat}
            defaultDate={new Date()}
          />
        </div>
        {!isNewPlan &&
          <div>
            <div>
              <Field name="cost" type="number" floatingLabelText="Do you know the price?" component={TextField} label="Cost" fullWidth={true} />
            </div>
            <div>
              <RaisedButton primary={true} label="Update" onTouchTap={handleEdit} />
              <RaisedButton primary={true} label="Delete" onTouchTap={handleDelete} />
            </div>
          </div>
        }
      </form>
    )
  }
}

PlanMetaForm = reduxForm({
  form: 'add-plan',
  destroyOnUnmount: false
})(PlanMetaForm);

export default PlanMetaForm;
