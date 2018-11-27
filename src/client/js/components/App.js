import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline, withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {
  Dashboard, Header, Menu, Notification,
} from './layouts';
import { StreetMap } from './maps';
import { AppMenu, MapMenu, LocationMenu } from './menus';
import MODES from '../constants/viewModes';

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
      locationData: false,
      mapViewMode: MODES.STREET,
      message: '',
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.setAppMessage = this.setAppMessage.bind(this);
    this.clearAppMessage = this.clearAppMessage.bind(this);
  }

  setAppMessage(msg) {
    this.setState({ message: msg });
  }

  clearAppMessage() {
    this.setState({ message: null });
  }

  openDrawer() {
    this.setState({ isDrawerOpen: true });
  }

  closeDrawer() {
    this.setState({ isDrawerOpen: false });
  }

  render() {
    const {
      message,
      isDrawerOpen,
      locationData,
      mapViewMode,
    } = this.state;
    return (
      <MuiThemeProvider theme={colorTheme}>
        <CssBaseline />
        <Header appTitle="Inclusive Harvard" openDrawer={this.openDrawer} />
        <Dashboard>
          {mapViewMode === MODES.STREET
            && <StreetMap setAppMessage={this.setAppMessage} />
          }
        </Dashboard>
        <Menu
          isDrawerOpen={isDrawerOpen}
          closeDrawer={this.closeDrawer}
        >
          <MapMenu id="map-menu" />
          <AppMenu id="app-menu" />
          <LocationMenu
            locationActive={locationData}
            id="location-menu"
          />
        </Menu>
        {message && (
          <Notification
            clearAppMessage={this.clearAppMessage}
            message={message}
          />)
        }
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(withStyles(styles)(App));
