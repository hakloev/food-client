import React from 'react';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Chip from 'material-ui/Chip';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import { actions as recipeActions } from '../data/recipes';

const styles = {
  chip: {
    margin: 4,
  }
}

class RecipeDetail extends React.Component {

	constructor(props) {
		super(props);
    this.props.fetchRecipe(this.props.params.id);
	}

	render() {
		if (Object.keys(this.props.recipe).length === 0) {
			return <CircularProgress size={80} thickness={5} />
		}

    const recipe = this.props.recipe;

		return (
      <div>
        <div>
          <h2>{recipe.name}<Chip style={styles.chip}>{recipe.type}</Chip></h2>
          {recipe.website.length > 0 && <p>{recipe.website}</p>}
        </div>
        <div>
          <section>
            {/* ingredients  */}
            <Table
              selectable={false}
              >
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                >
                <TableRow>
                  <TableHeaderColumn>Name</TableHeaderColumn>
                  <TableHeaderColumn>Amount</TableHeaderColumn>
                  <TableHeaderColumn>Preparation</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                >
                {recipe.ingredients.map(ing => {
                  return <TableRow>
                    <TableRowColumn>{ing.name}</TableRowColumn>
                    <TableRowColumn>{ing.amount} {ing.unit}</TableRowColumn>
                    <TableRowColumn>{ing.preparation}</TableRowColumn>
                  </TableRow>
                })}
              </TableBody>
            </Table>
          </section>
          <section>
            {recipe.steps.map(step => {
              return <div>
                <h2>Steg {step.step_number}</h2>
                <p>{step.description}</p>
              </div>
            })}
          </section>
        </div>
      </div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    recipe: state.recipes.all[ownProps.params.id],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRecipe: id => dispatch(recipeActions.fetchSingleRecipe(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
