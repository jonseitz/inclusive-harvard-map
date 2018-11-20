import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import {
  CssBaseline, withStyles,
} from '@material-ui/core';
import {
  MuiThemeProvider, createMuiTheme,
} from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

import Dashboard from './layouts/Dashboard';
import Header from './layouts/Header';
import Menu from './layouts/Menu';
import Footer from './layouts/Footer';
import Notification from './layouts/Notification';

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[600],
    },
    secondary: {
      main: '#a51c30',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = (theme) => {
  return {
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  openDrawer() {
    this.setState({ isDrawerOpen: true });
  }

  closeDrawer() {
    this.setState({ isDrawerOpen: false });
  }

  render() {
    const { isDrawerOpen } = this.state;
    return (
      <MuiThemeProvider theme={colorTheme}>
        <CssBaseline />
        <Header appTitle="Inclusive Harvard" openDrawer={this.openDrawer} />
        <Dashboard />
        <Menu isDrawerOpen={isDrawerOpen} closeDrawer={this.closeDrawer} />
        <Footer />
        <Notification />
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(withStyles(styles)(App));
