Vue.use(VueRouter);
import routes from './routes'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        Vue.$cookies.keys().forEach(item => Vue.$cookies.remove(item))
        next();
    }
    let token = Vue.$cookies.get('token');
    console.log('token',token)
    if (!token && to.path !== '/login') {
        next({
            path: '/login'
        })
    } else {
        next();
    }
});

export default router