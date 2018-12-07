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
    sidebarCard: {
      [theme.breakpoints.up('sm')]: {
        width: '25%',
        minWidth: '200px',
        border: '2px solid black',
      },
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
                {`${building.hasLactationRoom ? '' : 'No '}Lactation Room`}
              </ListItemText>
            </ListItem>
            <ListItem dense divider disableGutters>
              <ListItemText>
                {`${building.hasLactationRoom ? '' : 'No '}Gender-Neutral Restroom`}
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
