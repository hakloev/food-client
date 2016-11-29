import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
    />
    <MenuItem primaryText="Create new recipe"
      containerElement={<Link to="/recipes/create/" />}
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
    const navLinkProps = {
      className: 'layout__nav-link',
      activeClassName: 'layout__nav-link--selected'
    };

    return (
			<MuiThemeProvider>
				<div id="main-container">
					<AppBar
            title={<Link to="/">Home</Link>}
            showMenuIconButton={false}
            iconElementRight={<Menu />}
          />
					{children}
				</div>
			</MuiThemeProvider>
    );
  }
}
