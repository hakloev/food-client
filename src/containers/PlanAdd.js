import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Moment from 'moment';

import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import PlanMetaForm from '../components/PlanMetaForm';
import PlanRecipesForm from '../components/PlanRecipesForm';
import PlanAddButton from '../components/PlanAddButton';

import { actions as plansActions } from '../data/plans';

class PlanAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
    }
  }

  onSubmit = () => {
    console.log('submit add-plan');
    this.props.handleFormSubmit('add-plan');
  }

  handleSubmit = (data) => {
    console.log('form submit', data);
    this.props.addPlan(data);
  }

  handleNextStep = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  handlePreviousStep = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <PlanMetaForm isNewPlan onSubmit={this.handleMetaSubmit} />
      case 1:
        return <PlanRecipesForm isNewPlan recipes={this.props.recipes} onSubmit={this.handleSubmit} />
      default:
        return "Invalid step, what happened here?"
    }
  }

  render() {
    const  { finished, stepIndex } = this.state;
    return (
      <div>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Create a new plan</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add recipes</StepLabel>
          </Step>
        </Stepper>
        <div>
          {this.getStepContent(stepIndex)}
          <div>
            <RaisedButton
              label={stepIndex === 1 ? 'Finish' : 'Next'}
              primary={true}
              onTouchTap={stepIndex === 1 ? this.onSubmit : this.handleNextStep}
            />
            {stepIndex > 0 && <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onTouchTap={this.handlePreviousStep}
            />}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    plans: state.plans.all,
    recipes: state.recipes.all,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFormSubmit: identifier => dispatch(submit(identifier)),
    addPlan: plan => dispatch(plansActions.createPlan(plan)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanAdd);
