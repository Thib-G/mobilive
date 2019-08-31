<template>
  <l-marker
    :key="theStation.name"
    :lat-lng="theStation.latlng"
    @popupopen="getTimes">
    <l-popup>
      <div class="mobilive-popup">
        <h4>{{ theStation.name }}
        <br />&nbsp;&nbsp;<span class="grey">
        <font-awesome-icon icon="arrow-circle-right" /> Brussel-Central</span></h4>
        <hr />
        <h3>
          <img class="svg-inline--fa fa-lg" src="static/img/irail-logo.svg" alt="iRail logo" />
          iRail
        </h3>
        <p>
          <template v-if="trains.length > 0">
            <span v-for="train in trains" :key="train.uri">
              <font-awesome-icon icon="train" />&nbsp;<b>{{ train.duration }}</b> min
              @ {{ train.departure.toFormat('H:mm') }}
              <small><span class="grey">{{ train.nr }}</span></small>
              &nbsp;<a :href="train.uri" target="_blank">
                <font-awesome-icon icon="external-link-alt" />
              </a>
              <br />
            </span>
          </template>
          <template v-if="trains.length === 0">
            <span v-for="index in 3" :key="index">
              <font-awesome-icon icon="train" />
                &nbsp;<span class="grey">
                  <font-awesome-icon icon="spinner" pulse />
                </span><br />
            </span>
          </template>
        </p>
        <hr />
        <h3><font-awesome-icon :icon="['fab', 'google']" /> Google Maps</h3>
        <p><font-awesome-icon icon="car" />&nbsp;
          <span v-if="carDuration"><b>{{ carDuration }}</b></span>
          <span v-if="!carDuration">
            &nbsp;<span class="grey"><font-awesome-icon icon="spinner" pulse /></span>
          </span>
          min
        <a :href="gmapsUrl" target="_blank"><font-awesome-icon icon="external-link-alt" /></a>
        </p>
      </div>
    </l-popup>
  </l-marker>
</template>

<script>
import { LMarker, LPopup } from 'vue2-leaflet';
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
      trains: [],
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
      if (this.trains.length > 0) {
        return;
      }
      this.iRailService.getConnection(this.theStation.name, 'Bruxelles-Central')
        .then((data) => {
          const trains = data.slice(0, 3).map(train => ({
            duration: Math.round(train.duration / 60),
            departure: DateTime.fromMillis(train.departure.time * 1000),
            uri: train.departure.departureConnection.replace('http', 'https'),
            nr: train.departure.vehicle.replace('BE.NMBS.', ''),
          }));
          this.trains = trains;
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
    LMarker,
    LPopup,
  },
};
</script>

<style scoped>
  .mobilive-popup {
    width: 165px;
  }
</style>
