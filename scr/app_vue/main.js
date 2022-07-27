import Vue from 'vue';
import app from './app.vue'
import router from '../router/router.js';

import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);




new Vue(Vue.util.extend({
  router
}, app)).$mount('#app');

