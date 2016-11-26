import React, { Component, PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


injectTapEventPlugin();


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
				<main>
					<AppBar title="food-client" />
					{children}
				</main>
			</MuiThemeProvider>
    );
  }
}
