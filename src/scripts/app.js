/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import L, {
  Map, geoJSON, layerGroup, marker, icon,
} from 'leaflet';
import { basemapLayer } from 'esri-leaflet';
import 'leaflet-search';
import 'leaflet-search/dist/leaflet-search.min.css';
import { Offcanvas } from 'bootstrap';
import Toastr from 'toastr';
import GeoJsonServices from './data/services/GeoJsonServices';
import KegiatanServices from './data/services/KegiatanServices';
import rumijaPopupTemplate from './views/templates/maps/popup/kegiatan/rumija.template';
import panelFilterRuasBodyTemplate from './views/templates/maps/panelFilterRuasBody.template';
import ruasJalanPropinsiTemplate from './views/templates/maps/popup/ruas_jalan/ruasJalanPropinsi.template';
import panelFilterBodyTemplate from './views/templates/maps/panelFilterBody.template';
import ruasJalanKabKotaTarungTemplate from './views/templates/maps/popup/ruas_jalan/ruasJalanKabKotaTarung.template';
import ruasJalanTolOperasionalGeoJson from './maps/layers/geoJson/ruasJalanOperasional.geoJson';
import ruasJalanTolKonstruksiGeoJson from './maps/layers/geoJson/ruasJalanKonstruksi.geoJson';
import legendRuasJalan from './maps/widgets/legendRuasJalan.widget';
import ruasJalanNasionalGeoJson from './maps/layers/geoJson/ruasJalanNasional.geoJson';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import InventarisServices from './data/services/InventarisServices';

Toastr.options.positionClass = 'toast-top-left';
let activeHighlight = null;

const App = async () => {
  const map = new Map('maps_container');
  map.setView([-6.9175, 107.6191], 10);
  map.setMaxZoom(16);

  let activeBasemapLayer = basemapLayer('Streets').addTo(map);

  const filterPanelCanvas = document.getElementById('filterPanel');
  const filterPanel = new Offcanvas(filterPanelCanvas);
  const filterPanelLabel = document.getElementById('filterPanelLabel');
  const filterPanelBody = document.getElementById('filterPanelBody');

  const rumijaLayer = layerGroup([]);
  const inventarisRumijaLayer = layerGroup([]);

  const setRumijaLayer = (rumijaData) => {
    rumijaLayer.clearLayers();
    rumijaData.forEach((rumija) => {
      const layer = marker([rumija.lat, rumija.lng], {
        icon: icon({
          iconUrl: 'images/markers/rumija.png',
          iconSize: [32, 32],
        }),
      }).bindPopup(rumijaPopupTemplate(rumija));
      rumijaLayer.addLayer(layer);
    });
    rumijaLayer.addTo(map);
  };

  const setInventarisRumijaLayer = (rumijaInventarisByCategory) => {
    inventarisRumijaLayer.clearLayers();
    const categories = Object.keys(rumijaInventarisByCategory.data);
    categories.forEach((category) => {
      const datas = rumijaInventarisByCategory.data[category];
      datas?.data?.forEach((data) => {
        if (data.lat && data.lng) {
          if (datas.type === 'marker') {
            // const layer = marker(
            //   [data.lat, data.lng], {
            //     icon: icon({
            //       iconUrl: datas.icon_url || 'images/markers/rumija.png',
            //       iconSize: [32, 32],
            //     }),
            //   },
            // )
            // .bindPopup(data.popup);
            const layer = L.circleMarker([data.lat, data.lng], {
              radius: 5,
              fillColor: data.color,
              color: data.color,
              weight: 1,
              opacity: 1,
            })
              .bindPopup(data.popup);
            inventarisRumijaLayer.addLayer(layer);
          } else if (data.lat_akhir && data.lng_akhir) {
            const layer = L.polyline([
              [data.lat, data.lng],
              [data.lat_akhir, data.lng_akhir],
            ], { color: datas.color });
            inventarisRumijaLayer.addLayer(layer);
          }
        }
      });
    });
    // $('#debug_test').text(JSON.stringify(rumijaInventarisByCategory));
    inventarisRumijaLayer.addTo(map);
  };

  const onFilterSubmit = ({ properties }) => {
    const date_from = document.getElementById('start_date').value;
    const date_to = document.getElementById('end_date').value;
    const totalRumijaContainer = document.getElementById('total_rumija');
    KegiatanServices.getRumija({
      ruas_jalan: properties.nama_ruas_jalan,
      date_from,
      date_to,
    }).then((results) => {
      totalRumijaContainer.innerText = results.length;
      setRumijaLayer(results);
    });
  };

  const onSubmitInventarisCategories = ({ ruasJalanId, categoriesId }) => {
    InventarisServices.getInventarisRumijaByCategories({ ruasJalanId, categoriesId })
      .then((results) => {
        setInventarisRumijaLayer(results);
      });
  };

  const onFilterRuasSubmit = ({ properties }) => {
    const resultsContainer = document.getElementById('results_filter_ruas');
    resultsContainer.innerHTML = null;
  };

  const openFilterPanel = (properties) => {
    filterPanelLabel.innerText = properties.nama_ruas_jalan;
    filterPanelBody.innerHTML = panelFilterBodyTemplate(properties);
    // const filterSubmitButton = document.getElementById('filter_sumbit_button');
    // filterSubmitButton.addEventListener('click', () => {
    //   onFilterSubmit({ properties });
    // });
    onFilterSubmit({ properties });
    const inventarisSubmitButton = document.getElementById('inventaris_sumbit_button');
    inventarisSubmitButton.addEventListener('click', () => {
      const selectedInventarisCategoryId = $('#inventaris_rumija_select').val();
      onSubmitInventarisCategories({
        ruasJalanId: properties.id_ruas_jalan,
        categoriesId: selectedInventarisCategoryId,
      });
    });
    filterPanel.toggle();
  };

  const openFilterPanelRuas = (properties) => {
    filterPanelLabel.innerText = properties.nama_ruas_jalan;
    filterPanelBody.innerHTML = panelFilterRuasBodyTemplate();
    const filterSubmitButton = document.getElementById('filter_sumbit_button');
    filterSubmitButton.addEventListener('click', () => {
      onFilterRuasSubmit({ properties });
    });
    onFilterRuasSubmit({ properties });
    filterPanel.toggle();
  };

  const ruasJalanPropinsiData = await GeoJsonServices.getRuasJalanPropinsi();
  const ruasJalanPropinsi = geoJSON(ruasJalanPropinsiData, {
    style: {
      color: '#22cfcd',
      weight: 3,
    },
    onEachFeature(feature, point) {
      point.bindPopup(() => ruasJalanPropinsiTemplate(feature.properties));
    },
  });

  const ruasJalanKabKotaTarungData = await GeoJsonServices.getRuasJalanKabKotaTarung();
  const ruasJalanKabKotaTarung = geoJSON(ruasJalanKabKotaTarungData, {
    style: {
      color: 'blue',
      weight: 3,
    },
    onEachFeature(feature, point) {
      point.bindPopup(() => ruasJalanKabKotaTarungTemplate(feature.properties));
    },
  });

  const ruasJalanNasionalData = await GeoJsonServices.getRuasJalanNasional();
  const ruasJalanNasional = ruasJalanNasionalGeoJson(ruasJalanNasionalData);

  const ruasJalanTolOperasionalData = await GeoJsonServices.getRuasJalanTolOperasional();
  const ruasJalanTolOperasional = ruasJalanTolOperasionalGeoJson(
    ruasJalanTolOperasionalData,
  );

  const ruasJalanTolKonstruksiData = await GeoJsonServices.getRuasJalanTolKonstruksi();
  const ruasJalanTolKonstruksi = ruasJalanTolKonstruksiGeoJson(
    ruasJalanTolKonstruksiData,
  );

  map.on('click', () => {
    filterPanel.hide();
  });

  map.on('popupopen', (e) => {
    if (e.popup?._source?.feature?.id === 'RuasJalanPropinsi') {
      const { properties } = e.popup._source.feature;
      const openFilterPanelIcon = document.getElementById(
        `popup_${properties.id_ruas_jalan}`,
      );

      openFilterPanelIcon.addEventListener('click', () => {
        openFilterPanel(properties);
      });

      openFilterPanel(properties);

      openFilterPanelIcon.addEventListener('mouseover', (eMO) => {
        eMO.target.style.color = 'red';
      });

      openFilterPanelIcon.addEventListener('mouseleave', (eML) => {
        eML.target.style.color = 'black';
      });
    } else if (
      String(e.popup?._source?.feature?.id || '').includes(
        'ruas_jalan_kab_kota_tarung',
      )
      || String(e.popup?._source?.feature?.id || '').includes('ruas_jalan_custom')
    ) {
      const { properties } = e.popup._source.feature;
      const openFilterPanelIcon = document.getElementById(
        `popup_${properties.id}`,
      );

      openFilterPanelIcon.addEventListener('click', () => {
        openFilterPanelRuas(properties);
      });

      openFilterPanelIcon.addEventListener('mouseover', (eMO) => {
        eMO.target.style.color = 'red';
      });

      openFilterPanelIcon.addEventListener('mouseleave', (eML) => {
        eML.target.style.color = 'black';
      });
    }
  });

  const resetLayer = (layer) => new Promise((resolve) => {
    switch (layer.feature.id) {
      case 'RuasJalanPropinsi':
        resolve(() => ruasJalanPropinsi.resetStyle(layer));
        break;
      default: {
        if (String(layer.feature.id).includes('ruas_jalan_kab_kota_tarung')) {
          resolve(() => ruasJalanKabKotaTarung.resetStyle(layer));
        } else if (String(layer.feature.id).includes('ruas_jalan_nasional')) {
          resolve(() => ruasJalanNasional.resetStyle(layer));
        } else if (
          String(layer.feature.id).includes('ruas_jalan_tol_konstruksi')
        ) {
          resolve(() => ruasJalanTolKonstruksi.resetStyle(layer));
        } else if (
          String(layer.feature.id).includes('ruas_jalan_tol_operasional')
        ) { resolve(() => ruasJalanTolOperasional.resetStyle(layer)); }
        resolve(true);
      }
    }
  });

  const styleHighlight = {
    weight: 6,
    opacity: 0.7,
    fillOpacity: 0.8,
  };

  const ruasJalan = layerGroup([
    ruasJalanPropinsi,
    ruasJalanKabKotaTarung,
    ruasJalanNasional,
    ruasJalanTolOperasional,
    ruasJalanTolKonstruksi,
  ]).addTo(map);

  const searchControl = L.control.search({
    layer: ruasJalan,
    initial: false,
    marker: false,
    propertyName: 'index',
    placeholder: 'Cari..',
    autoCollapse: true,
  });

  const roadLayers = [
    ruasJalanPropinsi,
    ruasJalanKabKotaTarung,
    ruasJalanNasional,
    ruasJalanTolOperasional,
    ruasJalanTolKonstruksi,
  ];

  roadLayers.forEach((layer) => {
    layer.on('click', (e) => {
      filterPanel.hide();
      if (activeHighlight) {
        resetLayer(activeHighlight).then((reset) => {
          reset();
        });
      }
      activeHighlight = e.sourceTarget;
      e.sourceTarget.setStyle(styleHighlight);
    });
  });

  searchControl.on('search:locationfound', (e) => {
    if (activeHighlight) {
      resetLayer(activeHighlight).then((reset) => {
        reset();
      });
    }

    activeHighlight = e.layer;
    activeHighlight.setStyle(styleHighlight);
    e.layer.openPopup();
  });

  map.addControl(searchControl);
  const setBasemap = (basemap) => {
    if (activeBasemapLayer) {
      map.removeLayer(activeBasemapLayer);
    }

    activeBasemapLayer = basemapLayer(basemap);

    map.addLayer(activeBasemapLayer);
  };

  document.querySelector('#basemaps').addEventListener('change', (e) => {
    const basemap = e.target.value;
    setBasemap(basemap);
  });

  legendRuasJalan.addTo(map);

  // L.Routing.control({
  //   waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
  // }).addTo(map);

  const pinIcon = L.icon({
    iconUrl: 'images/markers/pin.png',
    iconSize: [20, 30],
  });

  let theMarker = { _latlng: { lat: null, lng: null } };

  L.control.locate().addTo(map);

  const locateButton = $('.leaflet-control-locate.leaflet-bar.leaflet-control');
  const activeLocation = () => locateButton.hasClass('active');

  let routingControl = null;
  const oldRouteLocation = { start: null, end: null };
  const containerRouteControl = () => $('.leaflet-routing-alternatives-container');

  const getRoute = (e) => {
    const { lat, lng } = e.latlng;
    if (theMarker !== undefined) {
      map.removeLayer(theMarker);
    }
    theMarker = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
    const { lat: endLat, lng: endLng } = theMarker._latlng;
    oldRouteLocation.end = L.latLng(endLat, endLng);
    if (oldRouteLocation.start !== null) {
      if (routingControl != null) {
        map.removeControl(routingControl);
        routingControl = null;
      }
      routingControl = L.Routing.control({
        createMarker() {
          return null;
        },
        waypoints: [oldRouteLocation.start, oldRouteLocation.end],
      }).addTo(map);
      if (containerRouteControl().is(':empty')) {
        containerRouteControl().html(
          '<span class="text-center"><i class="fa fa-spinner fa-spin p-2"></i>Sedang mencari route..</span>',
        );
      }
    }
  };

  map.on('locationfound', (locationEvent) => {
    const { latitude: startLat, longitude: startLng } = locationEvent;

    if (routingControl != null) {
      map.removeControl(routingControl);
      routingControl = null;
    }

    oldRouteLocation.start = L.latLng(startLat, startLng);

    if (oldRouteLocation.end != null) {
      routingControl = L.Routing.control({
        createMarker() {
          return null;
        },
        waypoints: [oldRouteLocation.start, oldRouteLocation.end],
      }).addTo(map);
      if (containerRouteControl().is(':empty')) {
        containerRouteControl().html(
          '<span class="text-center"><i class="fa fa-spinner fa-spin p-2"></i>Sedang mencari route..</span>',
        );
      }
    }
  });

  L.control
    .custom({
      position: 'topleft',
      content:
        '<button id="go-to-button" type="button" class="btn btn-default">'
        + '    <i id="go-to-icon" class="fa fa-location-arrow"></i>'
        + '</button>',
      classes: 'btn-group-vertical btn-group-sm card shadow leaflet-bar',
      style: {
        margin: '10px',
        padding: '0px 0 0 0',
        cursor: 'pointer',
      },
      datas: {
        foo: 'bar',
      },
      events: {
        click(data) {
          if (data.target.id === 'go-to-icon') {
            if (!activeLocation()) { Toastr.error('Aktifkan terlebih dahulu current location'); } else {
              const goToBotton = $('#go-to-button');
              if (goToBotton.hasClass('text-success')) {
                map.off('click', getRoute);
                if (theMarker !== undefined) {
                  map.removeLayer(theMarker);
                }
                if (routingControl != null) {
                  map.removeControl(routingControl);
                  routingControl = null;
                }
                goToBotton.removeClass('text-success');
              } else {
                goToBotton.addClass('text-success');
                map.on('click', getRoute);
                Toastr.info('Silahkan pilih titik tujuan pada peta');
              }
            }
          }
        },
        dblclick(data) {
          console.log('wrapper div element dblclicked');
          console.log(data);
        },
        contextmenu(data) {
          console.log('wrapper div element contextmenu');
          console.log(data);
        },
      },
    })
    .addTo(map);
};

export default App;
