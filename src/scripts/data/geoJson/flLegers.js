const { FeatureLayer } = require('esri-leaflet');

const PATHS = [
  // {
  //   name: 'POLY_UPTD_4',
  //   url: "https://services3.arcgis.com/kk81tlhFylVuTwCq/arcgis/rest/services/Leger_UPTD4_2019_WFL1/FeatureServer/2"
  // },
  // {
  //   name: 'POLY_UPTD_6',
  //   url: "https://services3.arcgis.com/kk81tlhFylVuTwCq/arcgis/rest/services/LegerMajalengka_WFL1/FeatureServer/2"
  // }, 
  {
    name: 'LINE_UPTD_4',
    url: "https://services3.arcgis.com/kk81tlhFylVuTwCq/arcgis/rest/services/Leger_UPTD4_2019_WFL1/FeatureServer/3"
  },
  {
    name: 'POLY_UPTD_6',
    url: "https://services3.arcgis.com/kk81tlhFylVuTwCq/arcgis/rest/services/LegerMajalengka_WFL1/FeatureServer/3"
  },
]


const TITLE = "Data Leger Jalan (Ruas)"

const flegers = PATHS.map(path => {  
  const flLeger = new FeatureLayer({
    url: path.url,
    title: TITLE,
    myType: "outsource-layer",
    style: {
      color: 'black',
      weight: 3,
    },
  });
  
  // flLeger.bindPopup((layer) => {
  //   const { properties } = layer.feature;
  //   const split = properties.PopupInfo.split('$0$')
  //   console.log(properties)
  //   return `
  //   <table class="table">
  //   <tr>
  //   <td>Lokasi</td>
  //   <td>:</td>
  //   <td>${split[0].split('_')[1]}</td>
  //   </tr>
  //   <tr>
  //   <td>Keterangan</td>
  //   <td>:</td>
  //   <td>${split[1].split(' ')[0]}</td>
  //   </tr>
  //   </table>
  //   `;
  // });

  return flLeger;
})

export default flegers;
