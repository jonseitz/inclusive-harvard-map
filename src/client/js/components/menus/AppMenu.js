import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Info,
  Lock,
  Email,
} from '@material-ui/icons';

class AppMenu extends React.Component {
  render() {
    return (
      <List>
        <ListItem button component="button">
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem button component="button">
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="About This App" />
        </ListItem>
        <ListItem button component="button">
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary="Your Privacy" />
        </ListItem>
      </List>
    );
  }
}

export default AppMenu;
