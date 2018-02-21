<template>
  <div class="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css';

import L from 'leaflet/dist/leaflet';

import { mapboxKey } from '@/assets/keys';
import stations from '@/assets/stations';
import GooglemapService from '@/services/googlemap-service';

// Hack for Leaflet
// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.imagePath = '';
L.Icon.Default.mergeOptions({
  // eslint-disable-next-line
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// END hack for Leaflet

const accessToken = mapboxKey;

export default {
  data() {
    return {
      // http://www.paysdevillers-tourisme.be/en/belgian-geographical-centre
      belgiumCenterLatLng: [50 + (38 / 60) + (28 / 3600), 4 + (40 / 60) + (5 / 3600)],
      bxlCentralLatLng: [50.84551, 4.35684],
      stations,
      map: {},
      markersGroup: new L.LayerGroup(),
      googlemapService: GooglemapService,
      distanceMatrixCar: [],
      distanceMatrixTrain: [],
    };
  },
  mounted() {
    this.initMap();
    this.updateMarkers();
    this.getDistanceMatrix();
  },
  computed: {
    stationsMarkers() {
      return this.stations.map((station, index) => {
        const popup = L.popup({ autoClose: false })
          .setContent(`<b>${station.name}</b><br />${station.latlng[0]}, ${station.latlng[1]}`);
        const marker = L.marker(station.latlng).bindPopup(popup);
        let stationWithMarker = Object.assign({}, station, { marker });
        if (this.distanceMatrixCar[index] && this.distanceMatrixTrain[index]) {
          stationWithMarker = Object.assign(
            stationWithMarker,
            { car: this.distanceMatrixCar[index] },
            { train: this.distanceMatrixTrain[index] },
          );
          stationWithMarker.marker.getPopup().setContent(`
            <h4>${station.name}</h4>
            <table>
              <thead>
                <tr>
                  <th><i class="fas fa-train"></i></th>
                  <th><i class="fas fa-car"></i>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${Math.round(stationWithMarker.train.duration.value / 60)} min</td>
                  <td>${Math.round(stationWithMarker.car.duration.value / 60)} min</td>
                </tr>
                <tr>
                  <td>${Math.round(stationWithMarker.train.distance.value / 1000)} km</td>
                  <td>${Math.round(stationWithMarker.car.distance.value / 1000)} km</td>
                </tr>
              </tbody>
            </table>
          `);
        }
        return stationWithMarker;
      });
    },
  },
  watch: {
    stationsMarkers() {
      this.updateMarkers();
    },
  },
  methods: {
    initMap() {
      this.map = L.map(this.$el);

      this.map.setView(this.belgiumCenterLatLng, 8);

      L.tileLayer(`https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=${accessToken}`, {
        attribution: `&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a> 
          &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
          &copy; Google API Services`,
      }).addTo(this.map);

      L.marker(this.bxlCentralLatLng)
        .addTo(this.map)
        .bindPopup('Brussel Centraal<br />Bruxelles Central')
        .openPopup();

      this.markersGroup.addTo(this.map);
    },
    updateMarkers() {
      this.markersGroup.clearLayers();
      this.stationsMarkers.forEach((station) => {
        this.markersGroup.addLayer(station.marker);
      });
    },
    getDistanceMatrix() {
      const origins = this.stations.map(station => station.latlng.join(','));
      const destinations = [this.bxlCentralLatLng.join(',')];
      this.googlemapService.getDistanceMatrix(origins, destinations, 'driving').then((data) => {
        const matrix = data;
        this.distanceMatrixCar = matrix.map(x => x.elements[0]);
      });
      this.googlemapService.getDistanceMatrix(origins, destinations, 'transit').then((data) => {
        const matrix = data;
        this.distanceMatrixTrain = matrix.map(x => x.elements[0]);
      });
    },
  },
};
</script>

<style scoped>
  .map {
    height: 100%;
    width: 100%;
  }
  .map >>> tr, .map >>> th {
    text-align: center;
  }
  .map >>> table {
    border-collapse: collapse;
  }
  .map >>> table, .map >>> th, .map >>> td {
      border: 1px solid lightgrey;
  }
</style>
