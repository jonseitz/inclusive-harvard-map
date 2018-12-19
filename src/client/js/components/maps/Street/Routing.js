import L from 'leaflet';
import 'leaflet-routing-machine';
import { MapLayer, withLeaflet } from 'react-leaflet';

/**
 * Custom react-leaflet component for adding routing data to map
 * @extends react-leaflet.MapLayer
 *
 */

class Routing extends MapLayer {
  /*
   * Fetches routing data from the server and creates the leafletElement
   * @function createLeafletElement
   * @param  {Object}  data
   * @param  {String[]}  from  The origination point for routing
   * @param  {String[]}  to  The destination point for routing
   */

  createLeafletElement({ from, to }) {
    this.leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(...from),
        L.latLng(...to),
      ],
      serviceUrl: '/osrm',
      profile: 'foot',
      show: false,
    });
    return this.leafletElement;
  }

  /**
   * Checks for any changes in the routing coordinates and refreshes the route, if necessary
   * @function updateLeafletElement
   * @param  {Object}  oldProps  The prior routing data
   * @param  {Object}  newProps  The new routing data
   */

  updateLeafletElement(oldProps, newProps) {
    if (
      oldProps.to[0] !== newProps.to[0] || oldProps.to[1] !== newProps.to[1]
    ) {
      const { to } = newProps;
      this.leafletElement.spliceWaypoints(1, 1, L.latLng(...to));
    }
    if (
      oldProps.from[0] !== newProps.from[0]
      || oldProps.from[1] !== newProps.from[1]
    ) {
      const { from } = newProps;
      this.leafletElement.spliceWaypoints(0, 1, L.LatLng(...from));
    }
  }

  /**
   * Adds leaflet element to the map
   * @function componentDidMount
   */

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(Routing);
