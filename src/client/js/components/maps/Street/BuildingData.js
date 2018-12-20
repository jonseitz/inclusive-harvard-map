import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItemText,
  ListItem,
  Typography,
} from '@material-ui/core';
import { countFacilities } from '../../../helpers';

const styles = (theme) => ({
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
  sidebarCard: {
    [theme.breakpoints.up('sm')]: {
      width: '25%',
      minWidth: '200px',
      border: '2px solid black',
    },
  },
});

/**
 * Displays important stats about the currently selected buildinng on the street map
 * @extends  React.Component
 * @param  {Object}  props
 * @param  {BuildingData}  building  All of the details about the selected building 
 * @param  {Object}  classes  JSS styles from withStyles 
 * @param  {Function} directionHandler  funcftion for getting direction data from OSRM
 * @param  {Function } floorplanHandler  function for switching into floor map mode 
 */

class BuildingData extends React.Component {
  render() {
    const {
      building,
      classes,
      directionHandler,
      floorplanHandler,
    } = this.props;
    const { address, facilities } = building;
    
    const { men, women, neutral, lactation } = countFacilities(facilities);
    return (
      <Card className={classes.sidebarCard}>
        <CardContent>
          <Typography variant="h6">{building.buildingName}</Typography>
          <Typography variant="subtitle1">
            {`${address.streetNumber} ${address.streetName}`}
          </Typography>
          <List>
            {building.numFloors !== null && (
              <ListItem dense divider disableGutters>
                <ListItemText>{`${building.numFloors} Floors`}</ListItemText>
              </ListItem>)
              }
            <ListItem dense divider disableGutters>
              <ListItemText>
                {`${building.hasElevator ? '' : 'No '}Elevator`}
              </ListItemText>
            </ListItem>
            <ListItem dense divider disableGutters>
              <ListItemText>
                {`${building.hasAccessibleEntrance ? '' : 'No '}Accessible Entrance`}
              </ListItemText>
            </ListItem>
            <ListItem dense divider disableGutters>
              <ListItemText>
                {`${lactation > 0 ? lactation : 'No'} Lactation Room`}
              </ListItemText>
            </ListItem>
            <ListItem dense divider disableGutters>
              <ListItemText>
                {`${neutral > 0  ? neutral : 'No'} Gender-Neutral Restroom${neutral > 1 ? 's' : ''}`}
              </ListItemText>
            </ListItem>
            <ListItem dense divider disableGutters>
              <ListItemText>
                {`${men > 0  ? men : 'No'} Men's Restroom${men > 1 ? 's' : ''}`}
              </ListItemText>
            </ListItem>
            <ListItem dense divider disableGutters>
              <ListItemText>
                {`${women > 0  ? women : 'No'} Women's Restroom${women > 1 ? 's' :''}`}
              </ListItemText>
            </ListItem>

          </List>
          <Grid container className={classes.buttonContainer}>
            <Grid item className={classes.buttonItem}>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                className={classes.button}
                onClick={() => { directionHandler(building.address); }}
              >
Directions
              </Button>
            </Grid>
            <Grid item className={classes.buttonItem}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.button}
                onClick={() => { floorplanHandler(building.id); }}
              >
Interior Map
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
