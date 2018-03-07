<template>
  <v-marker
    :key="theStation.name"
    :lat-lng="theStation.latlng"
    @l-popupopen="getTimes">
    <v-popup>
      <div style="width: 150px">
        <h4>{{ theStation.name }}
        <br />&nbsp;&nbsp;<span class="destination">
        <font-awesome-icon icon="arrow-circle-right" /> Brussel-Central</span></h4>
        <hr />
        <h3>
          <img class="svg-inline--fa fa-lg" src="static/img/irail-logo.svg" alt="iRail logo" />
          iRail
        </h3>
        <p><font-awesome-icon icon="train" /> <b>{{ trainDuration || '...' }}</b> min
        @ <span v-if="trainDeparture">{{ trainDeparture.toFormat('H:mm') }}</span>
          <span v-else>...</span>
          <span v-if="trainUrl">
            <a :href="trainUrl" target="_blank"><font-awesome-icon icon="external-link-alt" /></a>
          </span>
        </p>
        <hr />
        <h3><font-awesome-icon :icon="['fab', 'google']" /> Google Maps</h3>
        <p><font-awesome-icon icon="car" /> <b>{{ carDuration || '...' }}</b> min
        <a :href="gmapsUrl" target="_blank"><font-awesome-icon icon="external-link-alt" /></a>
        </p>
      </div>
    </v-popup>
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
      trainDuration: undefined,
      trainDeparture: undefined,
      trainUrl: undefined,
      carDuration: undefined,
      bxlCentralLatLng: [50.84551, 4.35684],
    };
  },
  computed: {
    gmapsUrl() {
      return `https://www.google.com/maps/dir/?api=1&origin=${this.theStation.latlng.join(',')}&destination=${this.bxlCentralLatLng.join(',')}`;
    },
  },
  methods: {
    getTimes() {
      this.getIRail();
      this.getGMaps();
    },
    getIRail() {
      if (this.trainDuration) {
        return;
      }
      this.iRailService.getConnection(this.theStation.name, 'Bruxelles-Central')
        .then((data) => {
          this.trainDuration = Math.round(data[0].duration / 60);
          this.trainDeparture = DateTime.fromMillis(data[0].departure.time * 1000);
          const trainUrl = data[0].departure.departureConnection;
          this.trainUrl = trainUrl.replace('http', 'https');
        });
    },
    getGMaps() {
      if (this.carDuration) {
        return;
      }
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
