import App from './App.vue'
import router from './router'
import store from './store'
import directive from "./directive"
import filters from "./filter"
import VueCookies from 'vue-cookies'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { messages } from '../public/static/i18n';
import VueI18n from 'vue-i18n';
import "./assets/icon/iconfont.css";
//基于element-ui封装的递归表格，在个人npm包中
import cwjTable from '@wj.cao/table' 
import './registerServiceWorker'

Vue.use(cwjTable)
Vue.use(VueI18n);
Vue.use(VueCookies)
Vue.use(directive)
Vue.use(filters) 
Vue.use(ELEMENT);

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

