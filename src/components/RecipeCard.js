import React from 'react';
import { browserHistory } from 'react-router';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { RECIPE_TYPES } from '../constants';


export default class RecipeCard extends React.Component {

  handleView = () => {
    const path = `/recipes/${this.props.recipe.id}/detail/`;
    browserHistory.push(path);
  }

  handleEdit = () => {
    const path = `/recipes/${this.props.recipe.id}/edit/`;
    browserHistory.push(path);
  }

  render() {
    const { recipe } = this.props;

    return (
      <Card>
        <CardHeader
          title={recipe.name}
          subtitle={RECIPE_TYPES[recipe.type]}
        />
        <CardActions>
          <FlatButton label="View" onTouchTap={this.handleView} />
          <FlatButton label="Edit" onTouchTap={this.handleEdit} />
        </CardActions>
      </Card>
    )
  }
}
