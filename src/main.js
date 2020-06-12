import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.config.productionTip = false;
import directive from "./directive"
Vue.use(directive)
import 'element-ui/lib/theme-chalk/index.css';
import {Button, Input,Form,FormItem, Menu,
  Submenu,
  MenuItem,
  MenuItemGroup} from 'element-ui';
Vue.use(Button)
.use(Input)
.use(Form)
.use(FormItem)
.use(Menu)
.use(Submenu)
.use(MenuItem)
.use(MenuItemGroup);
    
window.eventBus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
