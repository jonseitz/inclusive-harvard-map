import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { getFacilityData } from '../../../api';

const styles = (theme) => ({
  men: {
    stroke: 'red',
    strokeWidth: '8px',
    fill: 'lightgray',
  },
  women: {
    stroke: 'green',
    strokeWidth: '8px',
    fill: 'lightgray',
  },
  neutral: {
    stroke: 'blue',
    strokeWidth: '8px',
    fill: 'lightgray',
  },
  lactation: {
    stroke: 'orange',
    strokeWidth: '8px',
    fill: 'lightgray',
  },
});

/**
 * Displays a single facility within a floor SVG
 * @param  {Object}  props
 * @param  {Object}  classes  JSS classes from withStyles
 * @param  {String}  faciltyId  the mongoId for the intended facility
 *
 */

class FacilityMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
      layerViewBox: [],
      locationType: null,
    };
  }

  /**
   * Asynchonously requests the complete facility object when mounted
   * @function componentDidMount
   */

  componentDidMount() {
    const { facilityId } = this.props;
    getFacilityData(facilityId).then((data) => {
      const { path, layerViewBox, locationType } = data;
      this.setState({ path, layerViewBox, locationType });
    });
  }

  render() {
    const { path, layerViewBox, locationType } = this.state;
    const { classes } = this.props;
    return (
      <svg
        viewBox={layerViewBox.join(' ')}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={path}
          className={classes[locationType]}
        />
      </svg>
    );
  }
}

FacilityMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  facilityId: PropTypes.string.isRequired,
};

export default withStyles(styles)(FacilityMarker);
