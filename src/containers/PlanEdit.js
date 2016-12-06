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

class PlanEdit extends React.Component {
  constructor(props) {
    super(props);
    this.formIdentifier = `edit-plan-${props.params.id}`
  }

  state = {
    finished: false,
    stepIndex: 0,
  }

  onSubmit = () => {
    this.props.handleFormSubmit(this.formIdentifier);
  }

  handleSubmit = (data) => {
    this.props.editPlan(data);
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
        {stepIndex > 0 &&
          <FlatButton
          label="Back"
          disabled={stepIndex === 0}
          onTouchTap={this.handlePreviousStep}
          />
        }
      </div>
    )
  }

  render() {
    const  { finished, stepIndex } = this.state;
    const { plan, recipes } = this.props;

    return (
      <div style={{ maxWidth: 1280, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Edit plan</StepLabel>
            <StepContent>
              <PlanMetaForm
                form={this.formIdentifier}
                initialValues={plan}
                onSubmit={this.handleSubmit}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Add recipes</StepLabel>
            <StepContent>
              <PlanRecipesForm
                form={this.formIdentifier}
                initialValues={plan}
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

const mapStateToProps = (state, ownProps) => {
  return {
    plan: state.plans.all[parseInt(ownProps.params.id)],
    recipes: state.recipes.all,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFormSubmit: identifier => dispatch(submit(identifier)),
    editPlan: plan => dispatch(plansActions.editPlan(plan)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanEdit);
