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
    [theme.breakpoints.up('md')]: {
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
      floorLayers: [],
    };
    this.setFloor = this.setFloor.bind(this);
  }

  /**
   * Sets the currentFloor when the component mounts, typically to the default first floor
   * @function  componentDidMount
   */

  componentDidMount() {
    const { currentFloor } = this.state;
    const { buildingData } = this.props;
    const { floorplans } = buildingData;
    if (floorplans.some((floor) => (floor.floorNumber === currentFloor))) {
      this.setFloor(currentFloor);
    }
  }

  /**
   * Change to another floor within the building
   * @function setFloor
   * @param  {String}  floorNumber  the number of the floor to be displayed
   */

  setFloor(floorNumber) {
    const { buildingData } = this.props;
    const { floorplans } = buildingData;
    const { layers } = floorplans.find((e) => e.floorNumber === floorNumber);
    const layerIds = layers.map((e) => (e._id));
    this.setState({
      currentFloor: floorNumber,
      floorLayers: layerIds,
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
      floorLayers,
    } = this.state;
    const { address, floorplans } = buildingData;
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
          floorList={floorplans}
          setFloor={this.setFloor}
        />
        <FloorSVG
          currentFloor={currentFloor}
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
