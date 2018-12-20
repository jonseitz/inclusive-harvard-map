import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import { countFacilities } from '../../helpers';

const styles = (theme) => ({
  buildingName: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  buildingAddress: {
    fontWeight: theme.typography.fontWeightLight,
  },
  buildingDetail: {
    ...theme.typography.caption,
  },
  floorplanButton: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: '100%',
  },
  scrollableTable: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '90%',
    position: 'relative',
  },
});

/**
 * Displays a list of all buildings in map, with links to interior
 * @extends React.Component
 */

class BuildingList extends React.Component {
  render() {
    const { classes, floorplanHandler, buildingList } = this.props;

    return (
      <div className={classes.scrollableTable}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Restrooms</TableCell>
            <TableCell>Lactation Rooms</TableCell>
            <TableCell>Map</TableCell>
          </TableRow>
      </TableHead> 
      <TableBody>
        {buildingList.map((building) => {
          const { facilities } = building;
          console.log(facilities);
          const { men, women, neutral, lactation } = countFacilities(facilities);
          return (
          <TableRow>
            <TableCell>
              <Typography className={classes.buildingName}>
                {building.buildingName}
              </Typography>
              <Typography className={classes.buildingAddress}>
                {`${building.address.streetNumber} ${building.address.streetName}`}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.buildingDetail}>
                {`${neutral> 0  ? neutral : 'No'} Neutral`}
              </Typography>
              <Typography className={classes.buildingDetail}>
                {`${men> 0  ? men : 'No'} Men`}
              </Typography>
              <Typography className={classes.buildingDetail}>
                {`${women> 0  ? women : 'No'} Women`}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.buildingDetail}>
                {lactation> 0 ? lactation : 'None'}
              </Typography>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.floorplanButton}
                onClick={() => { floorplanHandler(building.id); }}
              >
                View 
              </Button>
            </TableCell>
          </TableRow>
          );
        })}
      </TableBody>
      </Table>
    </div>
    );
  }
}

BuildingList.propTypes = {
  classes: PropTypes.object.isRequired,
  floorplanHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(BuildingList);
