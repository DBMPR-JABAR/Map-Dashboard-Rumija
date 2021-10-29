import geoJsonPropinsi from '../geoJson/geoJsonPropinsi';
import geoJsonKabKotaTarung from '../geoJson/geoJsonKabKotaTarung';
import geoJsonNasional from '../geoJson/geoJsonNasional';
import geoJsonTolOperasional from '../geoJson/geoJsonTolOperasional';
import geoJsonTolKonstruksi from '../geoJson/geoJsonTolKonstruksi';

const { default: axios } = require('axios');

const GeoJsonServices = {
  async getRuasJalanPropinsi() {
    const response = await axios.get(
      `${process.env.API_URL}map/geojson/ruas_jalan_propinsi`,
    );
    const geoJsonMap = geoJsonPropinsi.map((geoJson) => {
      const properties = response.data.data.ruas_jalan_propinsi.filter(
        (data) => data.id_ruas_jalan === geoJson.id_ruas_jalan,
      );
      return {
        type: 'Feature',
        id: 'RuasJalanPropinsi',
        properties: properties.length > 0 ? properties[0] : [],
        geometry: geoJson.geo_json,
      };
    });

    return geoJsonMap;
  },
  async getRuasJalanKabKotaTarung() {
    const geoJsonMap = geoJsonKabKotaTarung.map((geoJson) => {
      const properties = {
        nama_ruas_jalan: geoJson.nama_ruas_jalan,
        geo_id: geoJson.geo_id,
        index: geoJson.nama_ruas_jalan,
        id: `ruas_jalan_kab_kota_tarung,${geoJson.geo_id}`,
      };
      return {
        type: 'Feature',
        id: `ruas_jalan_kab_kota_tarung,${geoJson.geo_id}`,
        properties,
        geometry: geoJson.geo_json,
      };
    });

    return geoJsonMap;
  },
  async getRuasJalanCustom() {
    const response = await axios.get(
      `${process.env.API_URL}map/geojson/ruas_jalan_custom`,
    );
    const geoJsonMap = response.data.data.ruas_jalan_custom.map((geoJson) => {
      const properties = {
        nama_ruas_jalan: geoJson.nama_lokasi,
        flag: geoJson.flag,
        keterangan: geoJson.keterangan,
        id: `ruas_jalan_custom,${geoJson.id}`,
        index: geoJson.nama_lokasi,
      };
      return {
        type: 'Feature',
        id: `ruas_jalan_custom_${geoJson.flag},${geoJson.id}`,
        properties,
        geometry: JSON.parse(geoJson.geo_json),
      };
    });

    return geoJsonMap;
  },
  async getRuasJalanNasional() {
    const geoJsonMap = geoJsonNasional.map((geoJson) => {
      const properties = {
        nama_ruas_jalan: geoJson.nama_ruas_jalan,
        geo_id: geoJson.geo_id,
        index: geoJson.nama_ruas_jalan,
        id: `ruas_jalan_nasional,${geoJson.geo_id}`,
      };
      return {
        type: 'Feature',
        id: `ruas_jalan_nasional,${geoJson.geo_id}`,
        properties,
        geometry: geoJson.geo_json,
      };
    });

    return geoJsonMap;
  },
  async getRuasJalanTolOperasional() {
    const geoJsonMap = geoJsonTolOperasional.map((geoJson) => {
      const properties = {
        nama_ruas_jalan: geoJson.nama_ruas_jalan,
        propinsi: geoJson.propinsi,
        kabupaten: geoJson.kabupaten,
        pengelola: geoJson.pengelola,
        geo_id: geoJson.geo_id,
        index: geoJson.nama_ruas_jalan,
        id: `ruas_jalan_tol_operasional,${geoJson.geo_id}`,
      };
      return {
        type: 'Feature',
        id: `ruas_jalan_tol_operasional,${geoJson.geo_id}`,
        properties,
        geometry: geoJson.geo_json,
      };
    });

    return geoJsonMap;
  },
  async getRuasJalanTolKonstruksi() {
    const geoJsonMap = geoJsonTolKonstruksi.map((geoJson) => {
      const properties = {
        nama_ruas_jalan: geoJson.nama_ruas_jalan,
        propinsi: geoJson.propinsi,
        kabupaten: geoJson.kabupaten,
        pengelola: geoJson.pengelola,
        geo_id: geoJson.geo_id,
        index: geoJson.nama_ruas_jalan,
        id: `ruas_jalan_tol_konstruksi,${geoJson.geo_id}`,
      };
      return {
        type: 'Feature',
        id: `ruas_jalan_tol_konstruksi,${geoJson.geo_id}`,
        properties,
        geometry: geoJson.geo_json,
      };
    });

    return geoJsonMap;
  },
};

export default GeoJsonServices;
