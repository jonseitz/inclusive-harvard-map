import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const SlimTableRow = withStyles(() => {
  return {
    root: {
      height: '28px',
    },
  };
})(TableRow);

const SlimTableCell = withStyles(() => {
  return {
    body: {
      padding: 0,
    },
  };
})(TableCell);

const styles = (theme) => {
  return {
    button: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      width: '100%',
    },
    buttonContainer: {
      marginTop: theme.spacing.unit * 2,
      flexDirection: 'column',
      flexGrow: 1,
    },
    buttonItem: {
      flexGrow: 1,
    },
  };
};

class BuildingData extends React.Component {
  render() {
    const {
      building,
      classes,
      directionHandler,
      floorplanHandler,
    } = this.props;
    const { address } = building;
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">{building.buildingName}</Typography>
          <Typography variant="subtitle1">{`${address.streetNumber} ${address.streetName}`}</Typography>
          <Table>
            <TableBody>
              <SlimTableRow>
                <SlimTableCell>Floors</SlimTableCell>
                <SlimTableCell>{building.numFloors}</SlimTableCell>
              </SlimTableRow>
              <SlimTableRow>
                <SlimTableCell>Elevators</SlimTableCell>
                <SlimTableCell>
                  {building.hasElevator ? 'Yes' : 'No'}
                </SlimTableCell>
              </SlimTableRow>
              <SlimTableRow>
                <SlimTableCell>Accessible Entrance</SlimTableCell>
                <SlimTableCell>{building.hasAccessibleEntrance ? 'Yes' : 'No'}</SlimTableCell>
              </SlimTableRow>
              <SlimTableRow>
                <SlimTableCell>Gender Neutral Restrooms</SlimTableCell>
                <SlimTableCell />
              </SlimTableRow>
              <SlimTableRow>
                <SlimTableCell>Single-Gender Restrooms</SlimTableCell>
                <SlimTableCell />
              </SlimTableRow>
              <SlimTableRow>
                <SlimTableCell>Lactation Rooms</SlimTableCell>
                <SlimTableCell />
              </SlimTableRow>
            </TableBody>
          </Table>
          <Grid container className={classes.buttonContainer}>
            <Grid item className={classes.buttonItem}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                onClick={() => { directionHandler(building.address); }}
              >
Get Directions
              </Button>
            </Grid>
            <Grid item className={classes.buttonItem}>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                className={classes.button}
                onClick={() => { floorplanHandler(building.id); }}
              >
View Floorplans
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

BuildingData.propTypes = {
  building: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  directionHandler: PropTypes.func.isRequired,
  floorplanHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(BuildingData);
