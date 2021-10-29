import { geoJSON } from 'leaflet';
import ruasJalanNasionalTemplate from '../../../views/templates/maps/popup/ruas_jalan/ruasJalanNasional.template';

const ruasJalanNasionalGeoJson = (ruasJalanNasionalData) => geoJSON(
  ruasJalanNasionalData, {
    style: {
      color: '#fc1513',
      weight: 3,
    },
    onEachFeature(feature, point) {
      point.bindPopup(() => ruasJalanNasionalTemplate(feature.properties));
    },
  },
);

export default ruasJalanNasionalGeoJson;
