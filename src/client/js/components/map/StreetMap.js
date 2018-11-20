import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet';
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
    };
    this.onClickReset = this.onClickReset.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
  }

  onClickReset() {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  }

  onViewportChange(viewport) {
    this.setState({ viewport });
  }

  render() {
    const { viewport } = this.state;
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
      </Map>
    );
  }
}

StreetMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StreetMap);
