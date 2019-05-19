import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history"
});

export const eventBus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
