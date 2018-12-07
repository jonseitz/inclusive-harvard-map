import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import cloneDeep from 'lodash.clonedeep';

// TODO: Click on floor to trigger fetch of floor layers
// TODO: After Layers are in, render to dashboard

class FloorMap extends React.Component {
  render() {
    const {
      buildingData,
    } = this.props;
    const orderedFloors = cloneDeep(buildingData.floorplans)
      .sort((a, b) => {
        return (a.floorNumber > b.floorNumber ? -1 : 1);
      });
    return (
      <div>
        <Typography variant="h5">{buildingData.buildingName}</Typography>
        <List>
          {orderedFloors.map((floor) => {
            return (
              <ListItem key={floor._id} button>
                <ListItemText>{floor.floorNumber}</ListItemText>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

FloorMap.propTypes = {
  buildingData: PropTypes.object.isRequired,
};

export default FloorMap;
