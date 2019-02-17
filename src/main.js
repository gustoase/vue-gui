import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import {genUniqueKey} from './mixin/guid'

import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:4113',
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
  render: h => h(App)
}).$mount('#app');
