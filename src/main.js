import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import {genUniqueKey} from './mixin/guid'

Vue.config.productionTip = false;

Vue.mixin({
  methods: { genUniqueKey }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
