import React from 'react';

import RecipeMetaForm from './RecipeMetaForm';

export default class RecipeForm extends React.Component {
  render() {
    return (
      <RecipeMetaForm recipe={this.props.recipe} />
    )
  }
}