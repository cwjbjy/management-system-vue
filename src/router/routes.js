const Home = () => import('../components/pages/home.vue')
const Login = () => import('../components/pages/login.vue')
const notFound = () =>import('../components/pages/404.vue')
const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        meta:{title:'home'},
        component:Home,
        children:[]
    },
    {
        path:'/login',
        meta:{title:'login'},
        component:Login
    },
    {
        path:'/404',
        meta:{title:'404'},
        component:notFound
    },
    {
        path:'*',
        redirect:'/404'
    },
]

export default routes