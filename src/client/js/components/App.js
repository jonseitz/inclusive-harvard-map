import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { CssBaseline, withStyles, Divider } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {
  Dashboard,
  Header,
  Menu,
  Notification,
  OverlayContent,
} from './layouts';
import { StreetMap, FloorMap } from './maps';
import { AppMenu, MapMenu, LocationMenu } from './menus';
import { getSingleBuilding } from '../api';
import MODES from '../constants/viewModes';

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#a51c30',
    },
    secondary: {
      main: grey[600],
    },
  },
  typography: {
    useNextVariants: true,
  },
  drawer: {
    width: 240,
  },
});

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBuilding: null,
      isDrawerOpen: false,
      locationActive: false,
      locationData: null,
      locationWatch: null,
      mapViewMode: MODES.STREET,
      message: '',
      showOverlayContent: false,
      textContent: null,
      textTitle: null,
    };
    this.floorplanHandler = this.floorplanHandler.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.contentHandler = this.contentHandler.bind(this);
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

  contentHandler(textTitle, textContent) {
    this.setState({
      showOverlayContent: true,
      textContent,
      textTitle,
    });
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
          this.setState({
            locationActive: true,
            locationData: [latitude, longitude],
          });
        },
        (err) => {
          this.setState({ message: err.message });
        });
        this.setState({
          locationWatch: watchId,
        });
      }
    }
  }

  floorplanHandler(buildingId) {
    this.setAppMessage('Loading Building Data...');
    getSingleBuilding(buildingId).then((building) => {
      this.setState({
        mapViewMode: MODES.FLOOR,
        chosenBuilding: building,
      });
    }).catch((err) => {
      console.error(err);
      this.setAppMessage(err.message);
    });
  }

  render() {
    const {
      message,
      isDrawerOpen,
      locationActive,
      locationData,
      mapViewMode,
      chosenBuilding,
      showOverlayContent,
      textContent,
      textTitle,
    } = this.state;
    return (
      <MuiThemeProvider theme={colorTheme}>
        <CssBaseline />
        <Header appTitle="Inclusive Harvard" openDrawer={this.openDrawer} />
        <Dashboard>
          {mapViewMode === MODES.STREET
            && (
            <StreetMap
              floorplanHandler={this.floorplanHandler}
              locationData={locationData}
              setAppMessage={this.setAppMessage}
            />
            )
          }
          {mapViewMode === MODES.FLOOR
            && (
            <FloorMap
              setAppMessage={this.setAppMessage}
              locationData={locationData}
              buildingData={chosenBuilding}
              floorplanHandler={this.floorplanHandler}
              exitHandler={() => {
                this.setState({ mapViewMode: MODES.STREET });
              }}
            />
            )
          }
        </Dashboard>
        <Menu
          isDrawerOpen={isDrawerOpen}
          closeDrawer={this.closeDrawer}
        >
          <MapMenu id="map-menu" contentHandler={this.contentHandler} />
          <Divider />
          <AppMenu id="app-menu" contentHandler={this.contentHandler} />
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
        <OverlayContent
          title={textTitle}
          isOpen={showOverlayContent}
          closeHandler={() => {
            this.setState({ showOverlayContent: false });
          }}
        >
          {textContent}
        </OverlayContent>
      </MuiThemeProvider>
    );
  }
}

export default hot(module)(withStyles(styles)(App));
