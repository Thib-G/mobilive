import Vue from 'vue';
import Router from 'vue-router';
import MobiPulse from '@/components/MobiPulse';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MobiPulse',
      component: MobiPulse,
    },
  ],
});
