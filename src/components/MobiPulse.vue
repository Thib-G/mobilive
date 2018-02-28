<template>
  <div class="map-wrapper">
    <div class="map" ref="map">
    </div>
    <floating-menu :polygons="polygons" :irail="irail" />
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css';

import L from 'leaflet/dist/leaflet';

import FloatingMenu from '@/components/FloatingMenu';

import GooglemapService from '@/services/googlemap-service';
import IRailService from '@/services/irail-service';

import { mapboxKey } from '@/assets/keys';
import stations from '@/assets/stations';
import { polyCoords15, polyCoords30, polyCoords45, polyCoords60 } from '@/assets/isochrones';

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

// const iso4app = window.iso4app;
// const isoEngine = new iso4app.Engine();

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
      iRailMarkersGroup: new L.LayerGroup(),
      googlemapService: GooglemapService,
      iRailService: IRailService,
      irail: { isIRailVisible: false },
      distanceMatrixCar: [],
      distanceMatrixTrain: [],
      isoline: {},
      isoGroup: new L.LayerGroup(),
      polygons: [
        { minutes: 15, coords: polyCoords15, visible: true },
        { minutes: 30, coords: polyCoords30, visible: true },
        { minutes: 45, coords: polyCoords45, visible: true },
        { minutes: 60, coords: polyCoords60, visible: true },
      ],
      iRailStations: [],
    };
  },
  mounted() {
    this.initMap();
    this.updateMarkers();
    this.getDistanceMatrix();
    this.updateIsochrones();
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
          const trainDuration = stationWithMarker.train.duration
            ? stationWithMarker.train.duration.value
            : 0;
          const carDuration = stationWithMarker.car.duration
            ? stationWithMarker.car.duration.value
            : 0;
          const trainDistance = stationWithMarker.train.distance
            ? stationWithMarker.train.distance.value
            : 0;
          const carDistance = stationWithMarker.car.distance
            ? stationWithMarker.car.distance.value
            : 0;
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
                  <td>${Math.round(trainDuration / 60)} min</td>
                  <td>${Math.round(carDuration / 60)} min</td>
                </tr>
                <tr>
                  <td>${Math.round(trainDistance / 1000)} km</td>
                  <td>${Math.round(carDistance / 1000)} km</td>
                </tr>
              </tbody>
            </table>
          `);
        }
        return stationWithMarker;
      });
    },
    iRailStationsMarkers() {
      return this.iRailStations.map((station) => {
        const popup = L.popup({ autoClose: false }).setContent(station.standardname);
        const marker = L.marker([station.locationY, station.locationX]).bindPopup(popup);
        return Object.assign({}, station, { marker });
      });
    },
  },
  watch: {
    stationsMarkers() {
      this.updateMarkers();
    },
    irail: {
      handler: 'updateIRailMarkers',
      deep: true,
    },
    polygons: {
      handler: 'updateIsochrones',
      deep: true,
    },
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map);

      this.map.setView(this.belgiumCenterLatLng, 8);

      L.tileLayer(`https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=${accessToken}`, {
        attribution: `&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a>
          &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
          &copy; Google API Services &copy; <a href="https://irail.be">iRail</a>`,
      }).addTo(this.map);

      L.marker(this.bxlCentralLatLng)
        .addTo(this.map)
        .bindPopup('Brussel Centraal<br />Bruxelles Central')
        .openPopup();

      this.markersGroup.addTo(this.map);
      this.iRailMarkersGroup.addTo(this.map);
      this.isoGroup.addTo(this.map);
    },
    updateMarkers() {
      this.markersGroup.clearLayers();
      this.stationsMarkers.forEach((station) => {
        this.markersGroup.addLayer(station.marker);
      });
    },
    updateIRailMarkers() {
      this.iRailMarkersGroup.clearLayers();
      this.getIRailStations().then(() => {
        if (this.irail.isIRailVisible) {
          this.iRailStationsMarkers.forEach((station) => {
            this.iRailMarkersGroup.addLayer(station.marker);
          });
        }
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
    updateIsochrones() {
      this.isoGroup.clearLayers();
      this.polygons
        .filter(x => x.visible)
        .sort((a, b) => b - a)
        .forEach((polygon) => {
          const newLayer = L.polygon(polygon.coords, { color: '#0066cc', fillOpacity: 0.2, weight: 2 });
          newLayer.on('click', () => Object.assign(polygon, { visible: false }));
          this.isoGroup.addLayer(newLayer);
        });
    },
    getIRailStations() {
      return this.iRailService.getAllStations().then((data) => {
        this.iRailStations = data;
      });
    },
  },
  components: {
    FloatingMenu,
  },
};
</script>

<style scoped>
  .map-wrapper, .map {
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
