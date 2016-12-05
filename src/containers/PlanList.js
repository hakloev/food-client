import React from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import Moment from 'moment';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

import PlanAddButton from '../components/PlanAddButton';

class PlanList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { plans } = this.props;

    console.log('plans', plans);

    if (plans.length === 0) {
      return <p>No plans</p>
    }

    return (
      <div>
        <h1>Plans:</h1>
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Week</TableHeaderColumn>
              <TableHeaderColumn>Cost</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {plans.map((p, i) => {
              console.log(p);
              return <TableRow key={p.start_date}>
                <TableRowColumn>{Moment(p.start_date).format('W')}</TableRowColumn>
                <TableRowColumn>{p.cost} kr</TableRowColumn>
                <TableRowColumn><FlatButton label="View" /></TableRowColumn>
              </TableRow>
            })}
          </TableBody>
        </Table>
        <PlanAddButton />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    plans: Object.keys(state.plans.all).map(p => state.plans.all[p]), // TODO: Selector here
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleFormSubmit: identifier => dispatch(submit(identifier)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanList);
