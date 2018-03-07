import axios from 'axios';

const IRAIL_URL = 'https://api.irail.be';
const options = {
  params: { format: 'json', lang: 'fr' },
};

export default {
  stationsPromise: undefined,
  getAllStations() {
    // return cached Promise if not null
    if (this.stationsPromise) {
      return this.stationsPromise;
    }
    this.stationsPromise = axios.get(`${IRAIL_URL}/stations/`, options)
      .then(response => response.data.station)
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    return this.stationsPromise;
  },
  getConnection(from, to) {
    const params = Object.assign({}, options.params, {
      from,
      to,
      timesel: 'departure',
      typeOfTransport: 'trains',
      results: 1,
    });
    return axios.get(`${IRAIL_URL}/connections/`, { params })
      .then(response => response.data.connection)
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
  },
};
