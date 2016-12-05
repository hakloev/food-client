import React from 'react';
import { connect } from 'react-redux';

import { actions as plansActions } from '../data/plans';

class PlanDetail extends React.Component {

	constructor(props) {
		super(props);
    this.props.fetchPlan(this.props.params.id);
	}

	render() {

    const plan = this.props.plan;
    if (plan === undefined) {
      return <h1>No plan</h1>
    }

		return (
      <h1>{plan.start_date}</h1>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    plan: state.plans.all[ownProps.params.id],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPlan: id => dispatch(plansActions.fetchPlan(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanDetail);
