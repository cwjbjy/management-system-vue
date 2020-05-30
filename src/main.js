import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false;
import directive from "./directive"
Vue.use(directive)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
    
window.eventBus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
