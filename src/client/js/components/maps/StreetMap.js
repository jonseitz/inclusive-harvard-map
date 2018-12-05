import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Map,
  TileLayer,
  LayerGroup,
  Circle,
  Marker,
  Popup,
  Tooltip,
} from 'react-leaflet';
import 'leaflet';
import { getBuildingList, getDirectionsToBuilding } from '../../api/buildings';
import { BuildingData, Routing } from '.';
import '../../../css/StreetMap.css';

const DEFAULT_VIEWPORT = {
  center: ['42.37447', '-71.11724'],
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

class StreetMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      buildings: [],
      isRouting: false,
      currentLocation: null,
      routingFrom: [...DEFAULT_VIEWPORT.center],
      routingTo: [],
    };
    this.onClickReset = this.onClickReset.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  componentDidMount() {
    const { setAppMessage, locationData } = this.props;
    // if (locationData) {
    // this.setState({
    // viewport: {
    // center: locationData,
    // zoom: 16,
    // },
    // routingFrom: locationData,
    // });
    // }
    setAppMessage('Loading Building Data...');
    getBuildingList().then((buildings) => {
      this.setState({ buildings });
      setAppMessage('Buildings loaded!');
    }).catch((err) => {
      setAppMessage(err.message);
    });
  }

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
      this.setState({
        currentLocation: locationData,
        routingFrom: locationData,
      });
    }
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  onClickReset() {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  }

  render() {
    const {
      viewport,
      buildings,
      currentLocation,
      isRouting,
      routingTo,
      routingFrom,
    } = this.state;
    const { classes } = this.props;
    return (
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
                >
                  <Popup className={classes.invisible}>
                    <BuildingData
                      directionHandler={() => {
                        this.setState({
                          isRouting: true,
                          routingFrom: currentLocation,
                          routingTo: [
                            building.address.latitude,
                            building.address.longitude,
                          ],
                        });
                      }}
                      building={building}
                    />
                  </Popup>
                </Marker>);
            })}
          </LayerGroup>
        )}
        {currentLocation && (
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
          <LayerGroup>
            <Routing from={routingFrom} to={routingTo} />
          </LayerGroup>
        )}
      </Map>
    );
  }
}

StreetMap.propTypes = {
  classes: PropTypes.object.isRequired,
  locationData: PropTypes.arrayOf(PropTypes.number),
  setAppMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(StreetMap);
