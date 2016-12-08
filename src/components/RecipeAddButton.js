import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
  addButton: {
    position: "fixed",
    right: "30px",
    bottom: "30px",
  }
}

class RecipeAddButton extends React.Component {

  render() {
    return (
        <FloatingActionButton
          style={styles.addButton}
          onTouchTap={() => browserHistory.push('/recipes/add/')}
        >
          <ContentAdd />
        </FloatingActionButton>
    )
  }
}

export default RecipeAddButton;
