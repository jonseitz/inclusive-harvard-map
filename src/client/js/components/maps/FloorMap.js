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
      matrix: [1, 0, 0, 1, 0, 0],
      previousMouse: null,
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

  zoomMap(amount) {
    const { matrix } = this.state;
    const update = [...matrix];
    if (matrix[0] + amount >= 1
      && matrix[0] + amount <= 3) {
      update[0] += amount;
      update[3] += amount;
    }
    this.setState({ matrix: update });
  }

  panMap([diffX, diffY]) {
    console.log(diffX, diffY);
    const threshold = 1;
    const scale = 1;
    const { matrix } = this.state;
    const update = [...matrix];
    // 'LEFT_RIGHT'
    if (diffX > threshold || diffX < -(threshold)) {
      update[4] += (diffX / scale);
    }
    // 'UP_DOWN'
    if (diffY > threshold || diffY < -(threshold)) {
      update[5] += diffY / scale;
    }
    this.setState({ matrix: update });
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
      mapPanning,
      matrix,
      previousMouse,
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
        <div
          className={classes.svgBoundary}
          id="floor-map__svg-boundary"
          onDoubleClick={() => {
            const update = [...matrix];
            update[0] = 1;
            update[3] = 1;
            this.setState({ matrix: [1, 0, 0, 1, 0, 0] });
          }}
          onWheel={(evt) => {
            const mvmt = evt.deltaY;
            this.zoomMap(mvmt > 0 ? 0.1 : -0.1);
          }}
          onMouseDown={() => {
            this.setState({
              mapPanning: true,
            });
          }}
          onMouseUp={() => {
            this.setState({ mapPanning: false });
          }}
          onMouseLeave={() => {
            this.setState({ mapPanning: false });
          }}
          onMouseOut={() => {
            this.setState({ mapPanning: false });
          }}
          onMouseEnter={(evt) => {
            this.setState({ mapPanning: evt.buttons === 1 });
          }}
          onMouseMove={(evt) => {
            this.setState({
              previousMouse: [evt.clientX, evt.clientY],
            });
            if (mapPanning) {
              const [prevX, prevY] = previousMouse;
              const diffX = evt.clientX - prevX;
              const diffY = evt.clientY - prevY;
              this.panMap([diffX, diffY]);
            }
          }}
          onKeyPress={(evt) => {
            console.log(evt);
          }}
        >
          <svg
            id="floor-map__layers"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <g transform={`matrix(${matrix.join(' ')})`}>
              {floorLayers.map((layerId) => (
                <FloorLayer
                  key={layerId}
                  layerId={layerId}
                />
              ))}
            </g>
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
