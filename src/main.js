import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false;

import directive from "./directive"
Vue.use(directive)

import gojs from "gojs"
Vue.use(gojs)

import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Input,
  Form,
  FormItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Row,
  Col,
  Card,
  Progress,
  Icon,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Backtop
} from 'element-ui';
Vue.use(Button)
  .use(Input)
  .use(Form)
  .use(FormItem)
  .use(Menu)
  .use(Submenu)
  .use(MenuItem)
  .use(MenuItemGroup)
  .use(Table)
  .use(TableColumn)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Progress)
  .use(Icon)
  .use(Checkbox)
  .use(CheckboxButton)
  .use(CheckboxGroup)
  .use(Backtop);

window.eventBus = new Vue();


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')