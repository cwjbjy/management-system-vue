// import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import directive from "./directive"
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css';
import { messages } from '../public/utils/i18n';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
Vue.use(VueCookies)
Vue.use(directive)
import ElementUI from 'element-ui';
Vue.use(ElementUI);
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

Vue.config.productionTip = false;
window.eventBus = new Vue();

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')

