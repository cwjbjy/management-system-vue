import NProgress from 'nprogress'; // progress bar
import Vue from 'vue';
import VueRouter from 'vue-router';

import { routes } from './routes';

import 'nprogress/nprogress.css'; // progress bar style

Vue.use(VueRouter);
NProgress.configure({ showSpinner: false });

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: 'history',
  routes,
});

/**
 * 路由全局前置守卫
 * 鉴权功能：判断用户是否登录
 * 没有登录则跳转到登录页面
 */
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.path === '/login') {
    Vue.$cookies.keys().forEach((item) => Vue.$cookies.remove(item));
    next();
  }
  let token = Vue.$cookies.get('token');

  if (!token && to.path !== '/login') {
    next({
      path: '/login',
    });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
