<template>
  <v-marker
    :key="theStation.name"
    :lat-lng="theStation.latlng"
    @l-popupopen="getTimes">
  <v-popup :content="popupContent" />
  </v-marker>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import { DateTime } from 'luxon';

import IRailService from '@/services/irail-service';
import GooglemapService from '@/services/googlemap-service';

export default {
  props: {
    station: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      theStation: Object.assign({}, this.station),
      iRailService: IRailService,
      googlemapService: GooglemapService,
      trainDuration: null,
      trainDeparture: null,
      trainUrl: null,
      carDuration: null,
      bxlCentralLatLng: [50.84551, 4.35684],
    };
  },
  computed: {
    popupContent() {
      return `
        <div style="width: 150px">
          <h4>${this.theStation.name}</h4>
          <hr />
          <h3><img src="static/img/irail-logo.svg" alt="iRail logo" width="20%" height="20%" /> iRail</h3>
          <p><i class="fas fa-train"></i> <b>${this.trainDuration || '...'}</b> min
          @ ${this.trainDeparture ? this.trainDeparture.toFormat('H:mm') : '...'} 
          ${this.trainUrl ? `<a href="${this.trainUrl}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}      
          </p>
          <hr />
          <h3><i class="fab fa-google"></i> Google Maps</h3>
          <p><i class="fas fa-car"></i> <b>${this.carDuration || '...'}</b> min</p>
        </div>
      `;
    },
  },
  methods: {
    getTimes() {
      this.getIRail();
      this.getGMaps();
    },
    getIRail() {
      this.iRailService.getConnection(this.theStation.name, 'Bruxelles-Central')
        .then((data) => {
          this.trainDuration = Math.round(data[0].duration / 60);
          this.trainDeparture = DateTime.fromMillis(data[0].departure.time * 1000);
          const trainUrl = data[0].departure.departureConnection;
          this.trainUrl = trainUrl.replace('http', 'https');
        });
    },
    getGMaps() {
      const origins = [this.theStation.latlng.join(',')];
      const destinations = [this.bxlCentralLatLng.join(',')];
      this.googlemapService.getDistanceMatrix(origins, destinations, 'driving')
        .then((data) => {
          this.carDuration = Math.round(data[0].elements[0].duration.value / 60);
        });
    },
  },
  components: {
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup,
  },
};
</script>