/* eslint-disable camelcase */
import axios from 'axios';
import CONFIG from '../../globals/config';

const KegiatanServices = {
  async getPemeliharaan({ ruas_jalan, date_from, date_to }) {
    const response = await axios.get(`${CONFIG.API_TJ_URL}map/pemeliharaan`, {
      params: { ruas_jalan, date_from, date_to },
    });
    return response.data.data.pemeliharaan;
  },
  async getPembangunan({ ruas_jalan, date_from, date_to }) {
    const response = await axios.get(`${CONFIG.API_TJ_URL}map/pembangunan`, {
      params: { ruas_jalan, date_from, date_to },
    });
    return response.data.data.pembangunan;
  },
  async getRumija({ ruas_jalan, date_from, date_to }) {
    const response = await axios.get(`${CONFIG.API_URL}map/rumija`, {
      params: { ruas_jalan, date_from, date_to },
    });
    return response.data.data.rumija;
  },
  async getBankeu({
    ruas_jalan_custom_id, geo_id, date_from, date_to,
  }) {
    const response = await axios.get(`${CONFIG.API_TJ_URL}map/bankeu`, {
      params: {
        ruas_jalan_custom_id, geo_id, date_from, date_to,
      },
    });
    return response.data.data.bankeu;
  },
};

export default KegiatanServices;
