import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import {genUniqueKey} from './mixin/guid'

import VueSocketIO from 'vue-socket.io'
import i18n from '@/plugins/i18n'
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_SOCKET_IO,
  vuex: {
    store,
    actionPrefix: 'socket_',
    mutationPrefix: 'socket_'
  }
}));

Vue.config.productionTip = false;

Vue.mixin({
  methods: { genUniqueKey }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
