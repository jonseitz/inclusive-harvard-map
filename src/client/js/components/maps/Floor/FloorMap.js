import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import FloorSVG from './FloorSVG';
import FloorDetails from './FloorDetails';

const styles = (theme) => ({
  backButtonContainer: {
    gridArea: 'BAK',
  },
  backButtonIcon: {
    marginRight: theme.spacing.unit,
  },
  interiorMap: {
    width: '100%',
    padding: `${theme.spacing.unit * 4}px`,
    display: 'grid',
    gridGap: `${theme.spacing.unit * 4}px`,
    gridTemplateAreas: `
      "BAK"
      "TTL"
      "MAP"
      "MAP"
      "DTL"
      `,
    [theme.breakpoints.up('sm')]: {
      gridTemplateAreas: `
        "BAK TTL TTL TTL TTL"
        "DTL MAP MAP MAP MAP"
        "DTL MAP MAP MAP MAP"
        "DTL MAP MAP MAP MAP"
        "DTL MAP MAP MAP MAP"
        "DTL MAP MAP MAP MAP"`,
    },
  },
  titleContainer: {
    gridArea: 'TTL',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

/**
 * Displays an SVG map of a given floor, along with important data about it
 * @extends  React.Component
 * @param  {Object}  props
 * @param  {BuildingData}  buildingData
 * @param  {Object}  classes  JSS classes from withStyles
 * @param  {Function}  exitHandler  function to leave the floormap and return to the streetmap
 */


class FloorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFloor: '01',
      currentFloorId: '',
      floorLayers: [],
      facilityIds: [],
    };
    this.setFloor = this.setFloor.bind(this);
  }

  /**
   * Sets the currentFloor when the component mounts, typically to the default first floor
   * @function  componentDidMount
   */

  componentDidMount() {
    const { buildingData, initialFloor } = this.props;
    const { floorplans } = buildingData;
    const thisFloor = floorplans.find((floor) => (floor.floorNumber === initialFloor));
    if (thisFloor) {
      this.setFloor(thisFloor._id);
    }
  }

  componentDidUpdate(prevProps) {
    const { initialFloor: originalFloor} = prevProps;
    const { currentFloor } = this.state;
    const { buildingData, initialFloor } = this.props;
    const { floorplans } = buildingData;
    if (
      initialFloor !== originalFloor 
      && initialFloor !== currentFloor
    ) {
      const thisFloor = floorplans.find((floor) => (floor.floorNumber === initialFloor));
      if (thisFloor) {
        this.setFloor(thisFloor._id);
      }
    } 
  }

  /**
   * Change to another floor within the building
   * @function setFloor
   * @param  {String}  floorId  the mongoId of the floor to be displayed
   */

  setFloor(floorId) {
    const { buildingData } = this.props;
    const { floorplans } = buildingData;
    const { floorNumber, layers, facilities } = floorplans.find((e) => e.id === floorId);
    const layerIds = layers.map((e) => (e._id));
    const facilityIds = facilities.map((e) => (e._id));
    this.setState({
      currentFloor: floorNumber,
      currentFloorId: floorId,
      floorLayers: layerIds,
      facilityIds,
    });
  }

  render() {
    const {
      buildingData,
      classes,
      exitHandler,
    } = this.props;
    const {
      currentFloor,
      currentFloorId,
      floorLayers,
      facilityIds
    } = this.state;
    const { address, floorplans, facilities } = buildingData;
    return (
      <div className={classes.interiorMap}>
        <div className={classes.backButtonContainer}>
          <Button
            className={classes.backButton}
            variant="text"
            color="secondary"
            onClick={exitHandler}
          >
            <ArrowBack className={classes.backButtonIcon} />
          Back
          </Button>
        </div>
        <div className={classes.titleContainer}>
          <Typography variant="h4">{buildingData.buildingName}</Typography>
          <Typography variant="subtitle1">{`${address.streetNumber} ${address.streetName}`}</Typography>
        </div>
        <FloorDetails
          className={classes.floorDetails}
          currentFloor={currentFloor}
          currentFloorId={currentFloorId}
          floorFacilities={facilities}
          floorList={floorplans}
          setFloor={this.setFloor}
        />
        <FloorSVG
          currentFloor={currentFloor}
          floorFacilities={facilityIds}
          floorLayers={floorLayers}
        />
      </div>
    );
  }
}

FloorMap.propTypes = {
  buildingData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  exitHandler: PropTypes.func.isRequired,
};

export default withStyles(styles)(FloorMap);
