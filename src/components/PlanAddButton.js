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

class PlanAddButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    browserHistory.push('/plans/add/');
  }

  render() {

    console.log('render plan add button')
    return (
        <FloatingActionButton
          style={styles.addButton}
          onTouchTap={this.handleClick}
        >
          <ContentAdd />
        </FloatingActionButton>
    )
  }
}

export default PlanAddButton;
