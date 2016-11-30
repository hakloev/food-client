import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import RecipeMetaForm from './RecipeMetaForm';

import { actions as recipeActions } from '../data/recipes';

const styles = {
  addButton: {
    position: "fixed",
    right: "30px",
    bottom: "30px",
  }
}

class RecipeAddModal extends React.Component {
  constructor(props) {
    super(props);
    this.formIdentifier = 'add-recipe-form';
  }

  // Executed when handleSubmit in form is Executed
  // handleSubmit in form executed when handleAdd dipatches submit('recipe');
  handleSubmit = (data) => {
    console.log('handle submit', data);
    this.props.addRecipe(data);
  }

  handleAdd = () => {
    console.log('add');
    this.props.handleFormSubmit(this.formIdentifier);
    // if(!this.props.form.recipe.syncErrors){
    //   this.props.hideModal();
    // }
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.props.hideModal()}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={this.handleAdd}
      />,
    ]

    return (
      <div>
        <FloatingActionButton
          style={styles.addButton}
          onTouchTap={() => this.props.showModal()}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add a recipe"
          actions={actions}
          modal={true}
          open={this.props.open}
          autoScrollBodyContent={true}
        >
          <RecipeMetaForm
            form={this.formIdentifier}
            isNewRecipe
            onSubmit={this.handleSubmit}
          />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    open: state.recipes.createModal.open,
    formData: state.form.recipe,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFormSubmit: identifier => dispatch(submit(identifier)),
    showModal: () => dispatch(recipeActions.showCreateModal()),
    hideModal: () => dispatch(recipeActions.hideCreateModal()),
    addRecipe: recipe => dispatch(recipeActions.createRecipe(recipe)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeAddModal);
