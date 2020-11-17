import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import router from './router';

import { apolloProvider } from './graphql/apollo';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(IconsPlugin);

new Vue({
  router,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
