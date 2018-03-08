<template>
  <div class="map-wrapper">
    <div class="map" ref="map">
      <v-map :zoom="8" :center="belgiumCenterLatLng">
        <v-tilelayer
          :url="`https://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}@2x.png?access_token=${accessToken}`"
          attribution='&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a>
          &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
          &copy; Google API Services &copy; <a href="https://irail.be">iRail</a>'></v-tilelayer>
        <v-marker :lat-lng="bxlCentralLatLng" @l-add="onRealMarkerAdd">
          <v-popup :content="`Brussel Centraal<br />Bruxelles Central`" />
        </v-marker>
        <template v-for="station in stationsWithText">
          <mobi-live-marker :station="station" :key="station.name" />
        </template>
      </v-map>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

import stations from '@/assets/stations';
import { mapboxKey } from '@/assets/keys';

import MobiLiveMarker from '@/components/MobiLiveMarker';

const accessToken = mapboxKey;

export default {
  data() {
    return {
      accessToken,
      // http://www.paysdevillers-tourisme.be/en/belgian-geographical-centre
      belgiumCenterLatLng: [50 + (38 / 60) + (28 / 3600), 4 + (40 / 60) + (5 / 3600)],
      bxlCentralLatLng: [50.84551, 4.35684],
      stations,
    };
  },
  computed: {
    stationsWithText() {
      return stations.map((station) => {
        const popupContent = `<p>${station.name}</p>`;
        return Object.assign({}, station, { popupContent });
      });
    },
  },
  methods: {
    onRealMarkerAdd(e) {
      e.target.openPopup();
    },
  },
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup,
    'mobi-live-marker': MobiLiveMarker,
  },
};
</script>

<style scoped>
  .map-wrapper, .map {
    height: 100%;
    width: 100%;
  }
</style>
