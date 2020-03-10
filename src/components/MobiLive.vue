<template>
  <div class="map-wrapper">
    <div class="map" ref="map">
      <l-map :zoom="8" :center="belgiumCenterLatLng">
        <l-tile-layer
          :url="`https://api.mapbox.com/styles/v1/${id}/tiles/{z}/{x}/{y}@2x?access_token=${accessToken}`"
          attribution='&copy; <a href="https://www.mapbox.com/feedback/">Mapbox</a>
          &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>
          &copy; Google API Services &copy; <a href="https://irail.be">iRail</a>'
          :options="{ tileSize: 512, maxZoom: 18, zoomOffset: -1 }"
          ></l-tile-layer>
        <l-marker :lat-lng="bxlCentralLatLng" @l-add="onRealMarkerAdd">
          <l-popup :content="`Brussel Centraal<br />Bruxelles Central`" />
        </l-marker>
        <template v-for="station in stations">
          <mobi-live-marker :station="station" :key="station.name" />
        </template>
      </l-map>
    </div>
  </div>
</template>

<script>
import {
  LMap, LTileLayer, LMarker, LPopup,
} from 'vue2-leaflet';

import stations from '@/assets/stations';
import { mapboxKey } from '@/assets/keys';

import MobiLiveMarker from '@/components/MobiLiveMarker.vue';

const accessToken = mapboxKey;

export default {
  data() {
    return {
      accessToken,
      id: 'mapbox/light-v10',
      // http://www.paysdevillers-tourisme.be/en/belgian-geographical-centre
      belgiumCenterLatLng: [50 + (38 / 60) + (28 / 3600), 4 + (40 / 60) + (5 / 3600)],
      bxlCentralLatLng: [50.84551, 4.35684],
      stations,
    };
  },
  methods: {
    onRealMarkerAdd(e) {
      e.target.openPopup();
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
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
