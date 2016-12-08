import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Moment from 'moment';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import PlanMetaForm from '../components/PlanMetaForm';
import PlanRecipesForm from '../components/PlanRecipesForm';

import { actions as plansActions } from '../data/plans';

import { DAYS } from '../constants';

class PlanAdd extends React.Component {
  constructor(props) {
    super(props);
    this.formIdentifier = 'add-plan';
  }

  componentWillUnmount() {
    // TODO: destroy add plan
  }

  state = {
    finished: false,
    stepIndex: 0,
  }

  onSubmit = () => {
    this.props.handleFormSubmit(this.formIdentifier);
  }

  handleSubmit = (data) => {
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

  renderStepActions = step => {
    const { stepIndex } = this.state;

    return (
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
    )
  }

  render() {
    const  { finished, stepIndex } = this.state;
    const { recipes } = this.props;

    const initialValues = {
      start_date: new Date(),
      items: Object.keys(DAYS).map(d => ({
        recipe_id: null,
        day: parseInt(d),
      })),
    }

    return (
      <div style={{ maxWidth: 1280, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Create a new plan</StepLabel>
            <StepContent>
              <PlanMetaForm
                isNewPlan
                form={this.formIdentifier}
                onSubmit={this.handleSubmit}
                initialValues={initialValues}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Add recipes</StepLabel>
            <StepContent>
              <PlanRecipesForm
                isNewPlan
                form={this.formIdentifier}
                recipes={recipes}
                onSubmit={this.handleSubmit}
              />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
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
