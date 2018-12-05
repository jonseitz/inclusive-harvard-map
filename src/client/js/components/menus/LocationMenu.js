import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  LocationOn,
  LocationOff,
} from '@material-ui/icons';

class LocationMenu extends React.Component {
  render() {
    const { locationActive, locationHandler } = this.props;
    return (
      <List>
        <ListItem
          button
          component="button"
          onClick={locationHandler}
        >
          <ListItemIcon>
            {locationActive ? <LocationOn /> : <LocationOff />}
          </ListItemIcon>
          <ListItemText primary={`Location ${locationActive ? 'On' : 'Off'}`} />
        </ListItem>
      </List>
    );
  }
}

LocationMenu.propTypes = {
  locationActive: PropTypes.bool,
  locationHandler: PropTypes.func,
};

LocationMenu.defaultProps = {
  locationActive: false,
};

export default LocationMenu;
