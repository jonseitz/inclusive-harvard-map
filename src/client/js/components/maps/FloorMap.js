import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import cloneDeep from 'lodash.clonedeep';
import FloorLayer from './FloorLayer';

const styles = (theme) => ({
  activeFloor: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  backButtonContainer: {
    gridArea: 'BAK',
  },
  backButtonIcon: {
    marginRight: theme.spacing.unit,
  },
  inactiveFloor: {
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      background: theme.palette.secondary.light,
    },
  },
  interiorMap: {
    width: '100%',
    padding: `${theme.spacing.unit * 4}px`,
    display: 'grid',
    gridGap: `${theme.spacing.unit * 4}px`,
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: `
    "BAK TTL TTL TTL TTL TTL TTL"
    "FLR MAP MAP MAP MAP MAP DTL"
    "FLR MAP MAP MAP MAP MAP DTL"
    "FLR MAP MAP MAP MAP MAP DTL"
    "FLR MAP MAP MAP MAP MAP DTL"
    "FLR MAP MAP MAP MAP MAP DTL"
    "KEY KEY KEY KEY KEY KEY KEY"
    "KEY KEY KEY KEY KEY KEY KEY"`,
    },
    // [theme.breakpoints.up('xs')]: {
    // gridTemplateAreas: '"FLR TTL TTL TTL"\n"FLR MAP MAP DTL"\n"FLR MAP MAP DTL"\n"FLR MAP MAP DTL"',
    // },
    // [theme.breakpoints.up('sm')]: {
    // gridTemplateAreas: '"FLR TTL TTL TTL"\n"FLR MAP MAP DTL"\n"FLR MAP MAP DTL"\n"FLR MAP MAP DTL"',
    // },
    // },
  },
  titleContainer: {
    gridArea: 'TTL',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  floorList: {
    gridArea: 'FLR',
  },
  floorDetails: {
    gridArea: 'DTL',
    textAlign: 'right',
  },
  svgBoundary: {
    gridArea: 'MAP',
    width: '100%',
    position: 'relative',
  },
});

class FloorMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFloor: '01',
      floorLayers: [],
    };
    this.setFloor = this.setFloor.bind(this);
  }

  componentDidMount() {
    const { currentFloor } = this.state;
    const { buildingData } = this.props;
    const { floorplans } = buildingData;
    if (floorplans.some((floor) => (floor.floorNumber === currentFloor))) {
      this.setFloor(currentFloor);
    }
  }

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
    const { address } = buildingData;
    const orderedFloors = cloneDeep(buildingData.floorplans)
      .sort((a, b) => {
        const floorA = parseInt(a.floorNumber.replace('B', '-'), 10);
        const floorB = parseInt(b.floorNumber.replace('B', '-'), 10);
        return floorA > floorB ? -1 : 1;
      });
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
                  this.setFloor(floor.floorNumber);
                }}
              >
                <ListItemText>{floor.floorNumber}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.floorDetails}>
          <List>
            <ListSubheader variant="overline">
            Details
            </ListSubheader>
            <ListItem divider dense>
              <ListItemText>Bathrooms: 2</ListItemText>
            </ListItem>
          </List>
        </div>
        <div className={classes.svgBoundary} id="floor-map__svg-boundary">
          <svg
            id="floor-map__layers"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            {floorLayers.map((layerId) => (
              <FloorLayer
                key={layerId}
                layerId={layerId}
              />
            ))}
          </svg>
        </div>
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
