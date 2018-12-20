import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import FloorLayer from './FloorLayer';
import FacilityMarker from './FacilityMarker';

const styles = {
  svgBoundary: {
    gridArea: 'MAP',
    width: '100%',
    position: 'relative',
  },
};

/**
 * Wrapper around the floor SVG layers to handler panning, zooming, etc.
 * @extends React.Component
 * @param  {Object}  props
 * @param  {Object}  props.classes  JSS classes from withStyles
 * @param  {Object}  props.currentFloor  the number of the floor currently being shown
 * @param  {Facility[]}  props.floorFacilities  List of all the restrooms on the current floor
 * @param  {String[]}  props.floorLayers  List of mongo ids for the individual layers of teh svg
 */

class FloorSVG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPanning: false,
      matrix: [1, 0, 0, 1, 0, 0],
      translate: [0, 0],
      scale: 1,
      previousMouse: null,
    };
  }

  /**
   * When the current floor changes, reset the zoom and pan levels
   * @function componentDidUpdate
   * @param  {Object}  prevProps  the props previously passed to the component
   */

  componentDidUpdate(prevProps) {
    const { currentFloor: lastFloor } = prevProps;
    const { currentFloor: newFloor } = this.props;
    if (lastFloor !== newFloor) {
      this.setState({
        translate: [0,0],
        scale: 1,
        matrix: [1, 0, 0, 1, 0, 0],
      });
    }
  }

  /**
   *  handle zooming the SVG via matrix transform
   *  @function  zoomMap
   *  @param  {Number}  amount  the degree by which the map should be zoomed
   */

  zoomMap(amount) {
    let {scale} = this.state;
    if (scale >= (1 - amount) && scale <= (4 + amount) ) {
      scale += amount;
      this.setState({scale});
    }
  }

  /**
   * handle panning the SVG via matrix transform
   * @function  panMap
   * @param  {Number[]}  diffs  How much to translate the map horizontally and vertically 
   */

  panMap([diffX, diffY]) {
    const { translate } = this.state;
    let [cx, cy] = translate;
    const threshold = 1;
    // // 'LEFT_RIGHT'
    if (diffX > threshold || diffX < -(threshold)) {
      cx += diffX;
    }
    // // 'UP_DOWN'
    if (diffY > threshold || diffY < -(threshold)) {
      cy += diffY;
    }
    this.setState({translate: [cx, cy]});
  }

  render() {
    const {
      classes,
      floorFacilities,
      floorLayers,
    } = this.props;
    const {
      mapPanning,
      matrix,
      translate,
      scale,
      previousMouse,
    } = this.state;
    return (
      <div
        className={classes.svgBoundary}
        id="floor-map__svg-boundary"
        onDoubleClick={() => {
          this.setState({ translate: [1, 1], scale: 1 });
        }}
        onWheel={(evt) => {
          const mvmt = evt.deltaY;
          this.zoomMap(mvmt > 0 ? 0.1 : -0.1);
        }}
        onMouseDown={() => {
          this.setState({ mapPanning: true });
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
      >
        <svg
          id="floor-map__layers"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <g transform={`translate(${translate.join(' ')}) scale(${scale})`}>
            {floorLayers.map((layerId) => (
              <FloorLayer
                key={layerId}
                layerId={layerId}
              />
            ))}
            {floorFacilities && floorFacilities.map((facilityId) => (
              <FacilityMarker 
                key={facilityId}
                facilityId={facilityId}
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
  floorFacilities: PropTypes.arrayOf(PropTypes.string),
  floorLayers: PropTypes.arrayOf(PropTypes.string),
};

FloorSVG.defaultProps = {
  currentFloor: null,
  floorLayers: [],
  floorFacilities: [],
};

export default withStyles(styles)(FloorSVG);
