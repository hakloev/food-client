import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import RecipeMetaForm from '../components/RecipeMetaForm';
import RecipeIngredientsForm from '../components/RecipeIngredientsForm';
import RecipeStepsForm from '../components/RecipeStepsForm';

import { actions as ingredientsActions } from '../data/ingredients';
import { actions as recipeActions } from '../data/recipes';

class RecipeAdd extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
  }

  componentWillMount() {
    this.props.fetchIngredients();
  }

  componentWillUnmount() {
    // TODO: destroy form
  }

  onSubmit = () => {
    this.props.handleFormSubmit('add-recipe');
  }

  handleNextStep = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePreviousStep = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleSubmit = formData => {
    this.props.addRecipe(formData);
  }

  renderStepActions = step => {
    const { stepIndex } = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={stepIndex === 2 ? this.onSubmit : this.handleNextStep}
          style={{marginRight: 12}}
        />
        {stepIndex > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePreviousStep}
          />
        )}
      </div>
    );
  }

  render() {
    const  { finished, stepIndex } = this.state;
    const { allIngredients } = this.props;

    const recipe = {
      name: null,
      website: null,
      type: null,
      ingredients: [],
      steps: [],
    }

    return (
      <div style={{ maxWidth: 1280, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Add recipe</StepLabel>
            <StepContent>
              <RecipeMetaForm
                form="add-recipe"
                initialValues={recipe}
                onSubmit={this.handleSubmit}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Add ingredients</StepLabel>
            <StepContent>
              <RecipeIngredientsForm
                form="add-recipe"
                initialValues={recipe}
                allIngredients={allIngredients}
                onSubmit={this.handleSubmit}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Add steps</StepLabel>
            <StepContent>
              <RecipeStepsForm
                form="add-recipe"
                initialValues={recipe}
                onSubmit={this.handleSubmit}
              />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allIngredients: state.ingredients.all,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipe: id => dispatch(recipeActions.fetchSingleRecipe(id)),
    fetchIngredients: () => dispatch(ingredientsActions.fetchAllIngredients()),
    addRecipe: recipe => dispatch(recipeActions.createRecipe(recipe)),
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeAdd);
