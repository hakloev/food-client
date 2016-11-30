import React from 'react';

import TextField from 'material-ui/TextField';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import AddIcon from 'material-ui/svg-icons/av/playlist-add-check';

class IngredientSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }

  handleInput = query => {
    this.setState({
      query,
    });
  }

  handleSearch = (inputValue, index) => {
    console.log('type change', inputValue, index);
    // index -1 if enter in textfield
    if (index === -1) {
      console.log('Enter pushed, need background search or create');
      return;
    }
    this.props.addIngredient(inputValue.id, index);
    this.setState({
      query: '',
    })
  }

  render() {
    console.log('ingredients to search for', this.props.ingredients);
    return (
      <div>
        <AutoComplete
          floatingLabelText="Search for ingredient"
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.props.ingredients}
          dataSourceConfig={{ text: 'name', value: 'id' }}
          maxSearchResults={5}
          openOnFocus={true}
          searchText={this.state.query}
          onUpdateInput={this.handleInput}
          onNewRequest={this.handleSearch}
        />
      </div>
    )
  }
}

export default IngredientSearchBar;
