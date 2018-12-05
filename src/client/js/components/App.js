import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline, withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';
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
  drawer: {
    width: 240,
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
      locationActive: false,
      locationData: null,
      locationWatch: null,
      mapViewMode: MODES.STREET,
      message: '',
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.setAppMessage = this.setAppMessage.bind(this);
    this.clearAppMessage = this.clearAppMessage.bind(this);
    this.locationHandler = this.locationHandler.bind(this);
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

  locationHandler() {
    const { locationWatch } = this.state;
    if ('geolocation' in navigator) {
      if (locationWatch !== null) {
        navigator.geolocation.clearWatch(locationWatch);
        this.setState({
          locationActive: false,
          locationData: null,
          locationWatch: null,
        });
      } else {
        const watchId = navigator.geolocation.watchPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          console.log(pos);
          this.setState({
            locationActive: true,
            locationData: [latitude, longitude],
          });
        },
        (err) => {
          console.error(err);
          this.setState({ message: err.message });
        });
        console.log(watchId);
        this.setState({
          locationWatch: watchId,
        });
      }
    }
  }

  render() {
    const {
      message,
      isDrawerOpen,
      locationActive,
      locationData,
      mapViewMode,
    } = this.state;
    return (
      <MuiThemeProvider theme={colorTheme}>
        <CssBaseline />
        <Header appTitle="Inclusive Harvard" openDrawer={this.openDrawer} />
        <Dashboard>
          {mapViewMode === MODES.STREET
            && (
            <StreetMap
              setAppMessage={this.setAppMessage}
              locationData={locationData}
            />
            )
          }
        </Dashboard>
        <Menu
          isDrawerOpen={isDrawerOpen}
          closeDrawer={this.closeDrawer}
        >
          <MapMenu id="map-menu" />
          <Divider />
          <AppMenu id="app-menu" />
          <Divider />
          <LocationMenu
            locationActive={locationActive}
            locationHandler={this.locationHandler}
            id="location-menu"
          />
          <Divider />
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
