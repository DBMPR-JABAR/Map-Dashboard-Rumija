import CONFIG from '../../globals/config';

const { FeatureLayer } = require('esri-leaflet');

const flProvinceRoad = new FeatureLayer({
  url:
    `${CONFIG.GEO_SERVER_URL
    }/geoserver/gsr/services/temanjabar/FeatureServer/0/`,
  customParameters: {
    ak: CONFIG.GEO_SERVER_AUTH_KEY,
  },
  style: {
    color: 'green',
    weight: 5,
  },
});

flProvinceRoad.bindPopup((layer) => {
  const { properties } = layer.feature;
  return `<p>${properties}</p>`;
});

export default flProvinceRoad;
