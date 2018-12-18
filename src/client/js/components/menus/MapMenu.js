import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  ChildFriendly,
  LocationCity,
  NotListedLocation,
} from '@material-ui/icons';

/**
 * Buttons for displaying imformation about teh content within the map
 * @extends React.Component
 */

class MapMenu extends React.Component {
  render() {
    return (
      <List>
        <ListItem button component="button">
          <ListItemIcon>
            <LocationCity />
          </ListItemIcon>
          <ListItemText primary="All Buildings" />
        </ListItem>
        <ListItem button component="button">
          <ListItemIcon>
            <NotListedLocation />
          </ListItemIcon>
          <ListItemText primary="List Restrooms" />
        </ListItem>
        <ListItem button component="button">
          <ListItemIcon>
            <ChildFriendly />
          </ListItemIcon>
          <ListItemText primary="Lactation Rooms" />
        </ListItem>
      </List>
    );
  }
}

export default MapMenu;
