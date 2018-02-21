import axios from 'axios';

import { gmapsKey } from '@/assets/keys';

const key = gmapsKey;

export default {
  getDistanceMatrix(origins, destinations, mode = 'driving') {
    const strOrigins = origins.join('|');
    const strDestinations = destinations.join('|');
    return axios.get(`https://mobilive.maww.be/maps_proxy/api/distancematrix/json?origins=${strOrigins}&destinations=${strDestinations}&mode=${mode}&language=fr&sensor=false&key=${key}`)
      .then(response => response.data.rows);
  },
};
