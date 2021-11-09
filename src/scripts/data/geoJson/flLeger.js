const { FeatureLayer } = require('esri-leaflet');

const PATH = "https://services3.arcgis.com/U26uBjSD32d7xvm2/arcgis/rest/services/Sceneasd_WFL1/FeatureServer/2"
const TITLE = "Data Leger Jalan (Ruas)"

const flLeger = new FeatureLayer({
  url: PATH,
  title: TITLE,
  myType: "outsource-layer",
  style: {
    color: 'black',
    weight: 3,
  },
});

flLeger.bindPopup((layer) => {
  const { properties } = layer.feature;
  const split = properties.PopupInfo.split('$0$')
  console.log(properties)
  return `
  <table class="table">
  <tr>
  <td>Lokasi</td>
  <td>:</td>
  <td>${split[0].split('_')[1]}</td>
  </tr>
  <tr>
  <td>Keterangan</td>
  <td>:</td>
  <td>${split[1].split(' ')[0]}</td>
  </tr>
  </table>
    `;
});

export default flLeger;
