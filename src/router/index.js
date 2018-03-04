import Vue from 'vue';
import Router from 'vue-router';
import MobiLive from '@/components/MobiLive';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MobiLive',
      component: MobiLive,
    },
  ],
});
