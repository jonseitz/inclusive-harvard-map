import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Map, TileLayer, LayerGroup, Circle, Marker, Tooltip,
} from 'react-leaflet';
import 'leaflet';
import BuildingData from './BuildingData';
import './StreetMap.css';

/**
 * sets an initial location on the John Harvard statue
 * @const  DEFAULT_VIEWPORT
 * @type  {Object}
 * @prop  {String[]}  center  longitude and latitude of the John Harvard statue
 * @prop  {Number}  zoom  reasonable default zoom level
*/

const DEFAULT_VIEWPORT = {
  center: ['42.37871', '-71.11627'],
  zoom: 16,
};

const styles = {
  mapStyle: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  invisible: {
    border: 0,
    boxShadow: 'none',
    background: 'rgba(0, 0, 0, 0)',
  },
};

const Routing = React.lazy(() => import('./Routing'));

/**
 * Renders the initial street-level map
 * @extends React.Component
 * @param  {Object}  props
 * @param  {Object}  classes  JSS classes from withStyles
 * @param  {Number[]|null}  locationData  if shared, the latitude and longitude of the user
 * @param  {Function}  floorplanHandler  Switch into floorMap mode
 * @param  {Function}  setAppMessage  Post a message to the Notification component
 */
class StreetMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBuilding: null,
      viewport: DEFAULT_VIEWPORT,
      isRouting: false,
      currentLocation: null,
      routingFrom: [...DEFAULT_VIEWPORT.center],
      routingTo: [],
    };
    this.map = React.createRef();
    this.onClickReset = this.onClickReset.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  /**
   *  If location tracking is enabled, set the currentLocation.
   *  Else, default to the John Harvard Statue
   *  @function componentDidMount
   */

  componentDidMount() {
    this.setState({
      chosenBuilding: null,
    });
    const { locationActive, locationData } = this.props;
    if (locationActive && locationData) {
      this.setState({ currentLocation: locationData });
    } else {
      this.setState({ currentLocation: ['42.37445', '-71.11721'] });
    }
  }

  /**
   * If location tracking is enabled, update the cached location data when it changes
   * @function componentDidUpdate
   */

  componentDidUpdate() {
    const { locationData } = this.props;
    const { currentLocation } = this.state;
    if (
      Array.isArray(locationData)
      && locationData.length === 2
      && (
        (Array.isArray(currentLocation)
          && currentLocation.length === 2
          && locationData[0] !== currentLocation[0]
          && locationData[1] !== currentLocation[1])
        || (currentLocation === null && locationData !== null)
      )
    ) {
      // safe to make state update with conditionals above
      // eslint-disable-next-line
      this.setState({
        currentLocation: locationData,
        routingFrom: locationData,
      });
    }
  }

  /**
   * Handle pan and zoom changes in the leaflet map
   * @function onViewportChange
   * @param  {Object}  viewport  The updated viewport object
   * @param  {String[]}  viewport.center  The latitude and longitude of the new centerpoint of the map
   * @param  {Number}  viewport.zoom  The new zoom level of the map
   */

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  /**
   * Handle resetting the map to it's default location
   * @function onClickrReset
   */

  onClickReset() {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  }

  render() {
    const {
      chosenBuilding,
      viewport,
      currentLocation,
      locationActive,
      isRouting,
      routingTo,
      routingFrom,
    } = this.state;
    const { floorplanHandler, classes, buildings } = this.props;

    return (
      <React.Fragment>
        <Map
          onViewportChanged={this.onViewportChange}
          viewport={viewport}
          className={classes.mapStyle}
          ref={this.map}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {buildings.length > 0 && (
          <LayerGroup>
            {buildings.map((building) => {
              const { address } = building;
              return (
                <Marker
                  key={building.id}
                  position={[address.latitude, address.longitude]}
                  onClick={() => {
                    this.setState({
                      chosenBuilding: building,
                    });
                  }
                  }
                >
                  {chosenBuilding !== null && chosenBuilding.id === building.id
                      && (
                      <Circle
                        center={[
                          address.latitude,
                          address.longitude,
                        ]}
                        radius={20}
                        fillColor="grey"
                        color="black"
                      />
                      )
                  }
                </Marker>
              );
            })}
          </LayerGroup>
          )}
          {locationActive && (
          <LayerGroup>
            <Circle
              center={currentLocation}
              radius="4"
            >
              <Tooltip>You are here</Tooltip>
            </Circle>
          </LayerGroup>
          )}
          {isRouting && (
          <React.Suspense fallback={null}>
            <LayerGroup>
              <Routing from={routingFrom} to={routingTo} />
            </LayerGroup>
          </React.Suspense>
          )}
        </Map>
        {chosenBuilding !== null && (
        <BuildingData
          floorplanHandler={floorplanHandler}
          exitHandler={() => {
            this.setState({
              chosenBuilding: null,
            });
          }}
          directionHandler={() => {
            this.setState({
              isRouting: true,
              routingFrom: currentLocation,
              routingTo: [
                chosenBuilding.address.latitude,
                chosenBuilding.address.longitude,
              ],
            });
          }}
          building={chosenBuilding}
        />)
       }
      </React.Fragment>
    );
  }
}

StreetMap.propTypes = {
  buildings: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object.isRequired,
  locationActive: PropTypes.bool,
  locationData: PropTypes.arrayOf(PropTypes.number),
  floorplanHandler: PropTypes.func.isRequired,
};

StreetMap.defaultProps = {
  buildings: [],
  locationActive: false,
  locationData: [],
};

export default withStyles(styles)(StreetMap);
