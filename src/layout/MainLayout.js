import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import theme from './theme';

const Menu = (props) => (
  <IconMenu
    { ...props }
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem
      primaryText="Create new plan"
      containerElement={<Link to="/plans/add/" />}
    />
    <MenuItem primaryText="All plans"
      containerElement={<Link to="/plans/" />}
    />
    <MenuItem primaryText="All recipes"
      containerElement={<Link to="/recipes/" />}
    />
  </IconMenu>
);
Menu.muiName = 'IconMenu';


export default class MainLayout extends Component {

  static propTypes = {
    location: PropTypes.object
  };

  render() {
    const { children, location } = this.props;

    return (
			<MuiThemeProvider muiTheme={theme}>
				<div id="main-container">
					<AppBar
            title={<Link to="/">food-fiesta</Link>}
            showMenuIconButton={false}
            iconElementRight={<Menu />}
          />
					{children}
				</div>
			</MuiThemeProvider>
    );
  }
}
