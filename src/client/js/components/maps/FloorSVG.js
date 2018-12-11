import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import FloorLayer from './FloorLayer';

const styles = {
  svgBoundary: {
    gridArea: 'MAP',
    width: '100%',
    position: 'relative',
  },
};

class FloorSVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPanning: false,
      matrix: [1, 0, 0, 1, 0, 0],
      previousMouse: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { currentFloor: lastFloor } = prevProps;
    const { currentFloor: newFloor } = this.props;
    if (lastFloor !== newFloor) {
      this.setState({
        matrix: [1, 0, 0, 1, 0, 0],
      });
    }
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
      classes,
      floorLayers,
    } = this.props;
    const {
      mapPanning,
      matrix,
      previousMouse,
    } = this.state;
    return (
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
    );
  }
}

FloorSVG.propTypes = {
  classes: PropTypes.object.isRequired,
  currentFloor: PropTypes.string,
  floorLayers: PropTypes.arrayOf(PropTypes.string),
};

FloorSVG.defaultProps = {
  currentFloor: null,
  floorLayers: [],
};

export default withStyles(styles)(FloorSVG);
