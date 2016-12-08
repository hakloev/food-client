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

class RecipeEdit extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
  }


  componentWillMount() {
    this.props.fetchIngredients();
  }

  componentDidMount() {
    if (this.props.recipe && this.props.recipe.name === undefined) {
      this.props.fetchRecipe(this.props.params.id);
    }
  }

  onSubmit = () => {
    const { recipe: { id: recipeId } } = this.props;
    this.props.handleFormSubmit(`edit-recipe-${recipeId}`);
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
    const { recipe } = this.props;
    this.props.editRecipe(formData, recipe.id);
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
    const {
      addIngredient,
      allIngredients,
      recipe,
      recipe: {
        ingredients = [], steps = [], ...recipeMetaData
      }
    } = this.props;

    if (recipeMetaData.id === undefined) {
      recipeMetaData.id = this.props.params.id;
    }

    if (Object.keys(recipe).length === 0) {
      return <h1>Loading recipe...</h1>
    }


    return (
      <div style={{ maxWidth: 1280, margin: 'auto' }}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>{`Edit ${recipeMetaData.name}`}</StepLabel>
            <StepContent>
              <RecipeMetaForm
                form={`edit-recipe-${recipeMetaData.id}`}
                initialValues={recipe}
                onSubmit={this.handleSubmit}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Edit ingredients</StepLabel>
            <StepContent>
              <RecipeIngredientsForm
                form={`edit-recipe-${recipeMetaData.id}`}
                initialValues={recipe}
                allIngredients={allIngredients}
                onSubmit={this.handleSubmit}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Edit steps</StepLabel>
            <StepContent>
              <RecipeStepsForm
                form={`edit-recipe-${recipeMetaData.id}`}
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

const mapStateToProps = (state, ownProps) => {
  let id = parseInt(ownProps.params.id || 0);
  const recipe = (id != 0 && state.recipes.all[id] !== undefined) ? state.recipes.all[id] : {};

  return {
    recipe,
    allIngredients: state.ingredients.all,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipe: id => dispatch(recipeActions.fetchSingleRecipe(id)),
    fetchIngredients: () => dispatch(ingredientsActions.fetchAllIngredients()),
    editRecipe: (recipe, id) => dispatch(recipeActions.editRecipe(recipe, id)),
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);
