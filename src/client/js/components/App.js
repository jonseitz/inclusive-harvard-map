import React from 'react';
import { hot } from 'react-hot-loader';
import {
  CircularProgress, CssBaseline, withStyles, Divider,
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import {
  Dashboard,
  Header,
  Menu,
  Notification,
  OverlayContent,
} from './layouts';
import { AppMenu, MapMenu, LocationMenu } from './menus';
import { getBuildingList, getSingleBuilding } from '../api';
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

const StreetMap = React.lazy(() => import('./maps/Street/StreetMap'));
const FloorMap = React.lazy(() => import('./maps/Floor/FloorMap'));
/**
 * Primary application component
 * @extends React.Component
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBuilding: null,
      chosenFloor: '01',
      buildingList: [],
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

  /**
   * Asynchonously fetch the list of buildings from the server
   * @function  componentDidMount
   */

  componentDidMount() {
    getBuildingList().then((buildingList) => {
      this.setState({ buildingList });
    }).catch((err) => {
      this.setAppMessage(err.message);
    });
  }

  /**
   * Passes a message through to the notification
   * @function  setAppMessage
   * @prop  {String}  msg  the text of the message
   */

  setAppMessage(msg) {
    this.setState({ message: msg });
  }

  /**
   * clears any messages shown in the notification
   * @function  clearAppMessage
   */

  clearAppMessage() {
    this.setState({ message: null });
  }

  /**
   * Open the menu
   * @function openDrawer
   */

  openDrawer() {
    this.setState({ isDrawerOpen: true });
  }

  /**
   * Close the menu
   * @function closeDrawer
   */

  closeDrawer() {
    this.setState({ isDrawerOpen: false });
  }

  /**
   * Display the content overlay
   * @function contentHandler
   * @param  {String}  textTitle  Name of the page to display
   * @param  {Component}  textContent  Component to display inside the overlay
   */

  contentHandler(textTitle, textContent) {
    this.setState({
      showOverlayContent: true,
      textContent,
      textTitle,
    });
  }

  /**
   * Handler for tracking and forgetting location data
   * @function locationHandler
   */

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

  /**
   * Handler for opening interior building maps in the dashboard
   * @function  floorplanHandler
   * @param  {String}  buildingId  The mongo id of the building to display
   */

  floorplanHandler(buildingId, floorNumber = '01') {
    getSingleBuilding(buildingId).then((building) => {
      this.setState({
        chosenBuilding: building,
        chosenFloor: floorNumber,
        mapViewMode: MODES.FLOOR,
        showOverlayContent: false,
      });
    }).catch((err) => {
      this.setAppMessage(err.message);
    });
  }

  render() {
    const {
      buildingList,
      message,
      isDrawerOpen,
      locationActive,
      locationData,
      mapViewMode,
      chosenBuilding,
      chosenFloor,
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
              <React.Suspense fallback={<CircularProgress />}>
                <StreetMap
                  floorplanHandler={this.floorplanHandler}
                  locationData={locationData}
                  locationActive={locationActive}
                  setAppMessage={this.setAppMessage}
                  buildings={buildingList}
                />
              </React.Suspense>
            )
          }
          {mapViewMode === MODES.FLOOR
            && (
            <React.Suspense>
              <FloorMap
                setAppMessage={this.setAppMessage}
                locationData={locationData}
                buildingData={chosenBuilding}
                initialFloor={chosenFloor}
                floorplanHandler={this.floorplanHandler}
                exitHandler={() => {
                  this.setState({ mapViewMode: MODES.STREET });
                }}
              />
            </React.Suspense>
            )
          }
        </Dashboard>
        <Menu
          isDrawerOpen={isDrawerOpen}
          closeDrawer={this.closeDrawer}
        >
          <MapMenu
            id="map-menu"
            contentHandler={this.contentHandler}
            floorplanHandler={this.floorplanHandler}
            buildingList={buildingList}
            setAppMessage={this.setAppMessage}
          />
          <Divider />
          <AppMenu
            id="app-menu"
            contentHandler={this.contentHandler}
          />
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
