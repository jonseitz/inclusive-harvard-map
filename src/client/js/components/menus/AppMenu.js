import React from 'react';
import PropTypes from 'prop-types';
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
import {
  ContactPage,
  AboutPage,
  PrivacyPage,
} from '../content';
/**
 *  Menu containing global items for static content pages
 *  @extends React.Component
 *  @param  {Object}  props
 *  @param  {Function}  contentHandler  Event handler for setting contents of modal overlay
 */

class AppMenu extends React.Component {
  render() {
    const { contentHandler } = this.props;
    return (
      <List>
        <ListItem
          button
          component="button"
          onClick={() => { contentHandler('Contact Us', <ContactPage />); }}
        >
          <ListItemIcon>
            <Email />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
        <ListItem
          button
          component="button"
          onClick={() => { contentHandler('About The App', <AboutPage />); }}
        >
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="About This App" />
        </ListItem>
        <ListItem
          button
          component="button"
          onClick={() => { contentHandler('Your Data & Privacy', <PrivacyPage />); }}
        >
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary="Your Privacy" />
        </ListItem>
      </List>
    );
  }
}

AppMenu.propTypes = {
  contentHandler: PropTypes.func.isRequired,
};

export default AppMenu;
