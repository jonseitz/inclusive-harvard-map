import React from 'react';
import PropTypes from 'prop-types';
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
import {
  BuildingList,
  RestroomList,
  LactationList,
} from '../content';

/**
 * Buttons for displaying imformation about teh content within the map
 * @extends React.Component
 */

class MapMenu extends React.Component {
  render() {
    const {
      contentHandler,
      floorplanHandler,
      buildingList,
      setAppMessage,
    } = this.props;
    return (
      <List>
        <ListItem
          button
          component="button"
          onClick={
            () => {
              contentHandler(
                'All Buildings',
                <BuildingList
                  floorplanHandler={floorplanHandler}
                  buildingList={buildingList}
                />
              );
            }
          }
        >
          <ListItemIcon>
            <LocationCity />
          </ListItemIcon>
          <ListItemText primary="All Buildings" />
        </ListItem>
        <ListItem
          button
          component="button"
          onClick={
            () => {
              contentHandler(
                'All Restrooms',
                <RestroomList
                  floorplanHandler={floorplanHandler}
                  setAppMessage={setAppMessage}
                />
              );
            }
          }
        >
          <ListItemIcon>
            <NotListedLocation />
          </ListItemIcon>
          <ListItemText primary="List Restrooms" />
        </ListItem>
        <ListItem
          button
          component="button"
          onClick={
            () => {
              contentHandler(
                'Lactation Rooms',
                <LactationList
                  floorplanHandler={floorplanHandler}
                  setAppMessage={setAppMessage}
                />
              );
            }
          }
        >
          <ListItemIcon>
            <ChildFriendly />
          </ListItemIcon>
          <ListItemText primary="Lactation Rooms" />
        </ListItem>
      </List>
    );
  }
}

MapMenu.propTypes = {
  buildingList: PropTypes.arrayOf(PropTypes.object),
  contentHandler: PropTypes.func.isRequired,
  floorplanHandler: PropTypes.func.isRequired,
  setAppMessage: PropTypes.func.isRequired,
};

export default MapMenu;
