import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  withStyles,
} from '@material-ui/core';

const styles = (theme) => ({
  floorDetails: {
    gridArea: 'DTL',
    display: 'grid',
    gridGap: `${theme.spacing.unit * 4}px`,
    gridTemplateAreas: `
    "KEY KEY"
    "FLL FCL"
    `,
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: `
      "FLL"
      "FLL"
      "FCL"
      "FCL"
      "KEY"
      `,
    },
  },
  floorList: {
    gridArea: 'FLL',
  },
  facilityList: {
    gridArea: 'FCL',
  },
  mapKey: {
    gridArea: 'KEY',
  },
  activeFloor: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  inactiveFloor: {
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      background: theme.palette.secondary.light,
    },
  },
});

/**
 * Shows pertinent details about the current floor
 * @extends  React.Component
 * @param  {Object}  props
 * @param  {Object}  props.classes  JSS styles from withStyles
 * @param  {Object[]}  props.floorList  List of all the floors in the building
 * @param  {String}  props.currentFloor  The number of the floor currently being displayed  
 * @param  {Function}  props.setFloor  Handler for changing between floors
 *
`*/

class FloorDetails extends React.Component {
  render() {
    const {
      classes,
      floorList,
      currentFloor,
      setFloor,
    } = this.props;

    const orderedFloors = cloneDeep(floorList)
      .sort((a, b) => {
        const floorA = parseInt(a.floorNumber.replace('B', '-'), 10);
        const floorB = parseInt(b.floorNumber.replace('B', '-'), 10);
        return floorA > floorB ? -1 : 1;
      });

    return (
      <div className={classes.floorDetails}>
        <div className={classes.floorList}>
          <List>
            <ListSubheader>
            Floors
            </ListSubheader>
            {orderedFloors.map((floor) => (
              <ListItem
                key={floor._id}
                button
                dense
                divider
                className={
                currentFloor === floor.floorNumber
                  ? classes.activeFloor
                  : classes.inactiveFloor
              }
                onClick={() => {
                  setFloor(floor.floorNumber);
                }}
              >
                <ListItemText>{floor.floorNumber}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.facilityList}>
          <List>
            <ListSubheader variant="overline">
            Details
            </ListSubheader>
            <ListItem divider dense>
              <ListItemText>Bathrooms: 2</ListItemText>
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

FloorDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  floorList: PropTypes.arrayOf(PropTypes.object),
  currentFloor: PropTypes.string.isRequired,
  setFloor: PropTypes.func.isRequired,
};

FloorDetails.defaultProps = {
  floorList: [],
};

export default withStyles(styles)(FloorDetails);
