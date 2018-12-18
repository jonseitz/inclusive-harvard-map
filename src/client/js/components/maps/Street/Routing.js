import L from 'leaflet';
import 'leaflet-routing-machine';
import { MapLayer, withLeaflet } from 'react-leaflet';

class Routing extends MapLayer {
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

  componentDidMount() {
    const { map } = this.props.leaflet;
    this.leafletElement.addTo(map);
  }
}

export default withLeaflet(Routing);
