import Vue from 'vue';
import VueCookies from 'vue-cookies';
import VueI18n from 'vue-i18n';
import Meta from 'vue-meta';

import { messages } from '../public/static/i18n';
import App from './App.vue';
import directive from './directive';
import ELEMENT from './element';
import filters from './filters';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import './registerServiceWorker';
//基于element-ui封装的递归表格，在个人npm包中
// eslint-disable-next-line import/order
import cwjTable from '@wj.cao/table';

import tracing from './utils/tracking';

Vue.use(cwjTable);
Vue.use(VueI18n);
Vue.use(VueCookies);
Vue.use(directive);
Vue.use(filters);
Vue.use(ELEMENT);
Vue.use(Meta);

/* 数据埋点 */
Vue.use(tracing, {
  requestUrl: `${process.env.VUE_APP_BASEURL}/trackweb`,
  appName: 'vue2-manage',
  event: false,
  performance: false,
  pv: true,
  error: false,
});

const i18n = new VueI18n({
  locale: 'zh',
  messages,
});

Vue.config.productionTip = false;

window.eventBus = new Vue();

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app');
