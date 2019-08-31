// IE11 polyfills
import 'core-js/fn/promise';
import 'core-js/fn/object/assign';
import 'core-js/fn/number/is-nan';

import '@/assets/style/app.css';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// FontAwesome 1
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import faTrain from '@fortawesome/fontawesome-free-solid/faTrain';
import faCar from '@fortawesome/fontawesome-free-solid/faCar';
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight';
import faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Hack for Leaflet
// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.imagePath = '.';
L.Icon.Default.mergeOptions({
  // eslint-disable-next-line
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// END hack for Leaflet

Vue.config.productionTip = false;

// FontAwesome 2
fontawesome.library.add(
  faGoogle,
  faTrain,
  faCar,
  faExternalLinkAlt,
  faArrowCircleRight,
  faSpinner,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
