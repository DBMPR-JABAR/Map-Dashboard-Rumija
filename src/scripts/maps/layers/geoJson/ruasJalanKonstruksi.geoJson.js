import { geoJSON } from 'leaflet';
import ruasJalanTolTemplate from '../../../views/templates/maps/popup/ruas_jalan/ruasJalanTol.template';

const ruasJalanTolKonstruksiGeoJson = (ruasJalanTolKonstruksiData) => geoJSON(
  ruasJalanTolKonstruksiData, {
    style: {
      color: '#f79b16',
      weight: 3,
    },
    onEachFeature(feature, point) {
      point.bindPopup(() => ruasJalanTolTemplate({ properties: feature.properties, type: 'Jalan Tol Konstruksi' }));
    },
  },
);

export default ruasJalanTolKonstruksiGeoJson;
