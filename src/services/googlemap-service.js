import axios from 'axios';

export default {
  getDistanceMatrix(origins, destinations, mode = 'driving') {
    const strOrigins = origins.join('|');
    const strDestinations = destinations.join('|');
    return axios.get(`https://mobilive.maww.be/maps_proxy/api/distancematrix/json?origins=${strOrigins}&destinations=${strDestinations}&mode=${mode}&language=fr&sensor=false&key=AIzaSyDMt44LVTS3PMQlPxkpz_WHUmmyd4RC1k8`)
      .then(response => response.data.rows);
  },
};
