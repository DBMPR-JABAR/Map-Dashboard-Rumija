/* eslint-disable camelcase */
import axios from 'axios';
import CONFIG from '../../globals/config';

const InventarisServices = {
  async getInventarisRumijaByCategories({ ruasJalanId, categoriesId }) {
    const response = await axios.get(`${CONFIG.API_URL}map/inventaris-rumija`, {
      params: { ruas_jalan_id: ruasJalanId, categories_id: categoriesId },
    });
    return response.data;
  },
};

export default InventarisServices;
