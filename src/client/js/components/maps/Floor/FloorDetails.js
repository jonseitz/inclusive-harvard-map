import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import {
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  Typography,
  withStyles,
} from '@material-ui/core';
import { countFacilities } from '../../../helpers';

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
  floorSelector: {
    background: theme.palette.secondary.light,
    textAlign: 'right',
    width: '80px',
  },
  selectorLabel: {
    top: `-${theme.spacing.unit * 2}px`
  },
  floorOption: {
    textAlign: 'right',
  },
  facilityList: {
    gridArea: 'FCL',
  },
  itemDivider: {
    marginTop: `${theme.spacing.unit/2}px`,
    marginBottom: `${theme.spacing.unit/2}px`,
  },
  subHeaderDivider: {
    marginTop: `${theme.spacing.unit/2}px`,
    marginBottom: `${theme.spacing.unit * 2}px`,
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
      floorFacilities,
      currentFloor,
      setFloor,
    } = this.props;
    
    const { men, women, neutral, lactation } = countFacilities(floorFacilities);
    
    const orderedFloors = cloneDeep(floorList)
      .sort((a, b) => {
        const floorA = parseInt(a.floorNumber.replace('B', '-'), 10);
        const floorB = parseInt(b.floorNumber.replace('B', '-'), 10);
        return floorA > floorB ? -1 : 1;
      });

    return (
      <div className={classes.floorDetails}>
        <div className={classes.floorList}>
          <FormControl>
            <InputLabel className={classes.selectorLabel} htmlFor="floor-selector">
              <Typography variant="h5">Floors</Typography>
            </InputLabel>
            <Select 
              className={classes.floorSelector}
              value={currentFloor}
              onChange={(evt)=> {setFloor(evt.target.value)}}
              inputProps={{
                name: 'floors',
                id: 'floor-selector',
              }}
            >
            {orderedFloors.map((floor) => (
              <MenuItem
                className={classes.floorOption}
                key={floor._id}
                value={floor.floorNumber}
              >
                {floor.floorNumber}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.facilityList}>
          <Typography variant="h5">On This Floor</Typography>
          <Divider className={classes.subHeaderDivider} />
            <Typography variant="subtitle2">
              {`Lacation Rooms: ${lactation}`}
            </Typography>
            <Divider className={classes.itemDivider} />
            <Typography variant="overline">Restrooms</Typography>
            <Typography variant="subtitle2">
              {`Gender-Neutral: ${neutral}`}
            </Typography>
            <Divider className={classes.itemDivider} />
            <Typography variant="subtitle2">
              {`Women's: ${women}`}
            </Typography>
            <Divider className={classes.itemDivider} />
            <Typography variant="subtitle2">
              {`Men's: ${men}`}
            </Typography>
            <Divider className={classes.itemDivider} />
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
