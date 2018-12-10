import React from 'react';
import PropTypes from 'prop-types';
import { getLayerData } from '../../api';

class FloorLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerData: null,
    };
  }

  componentDidMount() {
    const { layerId } = this.props;
    getLayerData(layerId).then((data) => {
      const { layerData, layerName, layerViewBox } = data;
      this.setState({ layerData, layerName, layerViewBox });
    });
  }

  render() {
    const { layerData, layerName, layerViewBox } = this.state;
    if (layerData) {
      return (
        <svg
          viewBox={layerViewBox.join(' ')}
          preserveAspectRatio="xMidYMid meet"
        >
          {layerData.map((layer, index) => (
            <path
              className={`floor-layer__${layerName}`}
              key={index}
              stroke="#000000"
              fill="none"
              strokeWidth="6px"
              d={layer}
            />
          ))}
        </svg>
      );
    }
    return null;
  }
}

FloorLayer.propTypes = {
  layerId: PropTypes.string.isRequired,
};

export default FloorLayer;
