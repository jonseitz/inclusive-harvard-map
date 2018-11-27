import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import {
  Map,
  TileLayer,
  LayerGroup,
  Circle,
} from 'react-leaflet';
import 'leaflet';
import { getBuildingList } from '../../api/buildings';
import '../../../../../node_modules/leaflet/dist/leaflet.css';

const DEFAULT_VIEWPORT = {
  center: ['42.37871', '-71.11627'],
  zoom: 17,
};

const styles = {
  mapStyle: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
};

class StreetMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      buildings: [],
    };
    this.onClickReset = this.onClickReset.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  componentDidMount() {
    const { setAppMessage } = this.props;
    setAppMessage('Loading Building Data...');
    getBuildingList().then((list) => {
      this.setState({ buildings: list });
      setAppMessage('Buildings loaded!');
    }).catch((err) => {
      setAppMessage(err.message);
    });
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  onClickReset() {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  }

  render() {
    const { viewport, buildings } = this.state;
    const { classes } = this.props;
    return (
      <Map
        onViewportChanged={this.onViewportChange}
        viewport={viewport}
        className={classes.mapStyle}
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
                <Circle
                  key={building.id}
                  center={[address.latitude, address.longitude]}
                  color="black"
                  radius={10}
                />);
            })}
          </LayerGroup>
        )}
      </Map>
    );
  }
}

StreetMap.propTypes = {
  classes: PropTypes.object.isRequired,
  setAppMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(StreetMap);
