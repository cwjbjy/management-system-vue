const Home = () => import('../components/layout/home.vue')
const Login = () => import('../components/layout/login.vue')
const notFound = () => import('../components/layout/404.vue')
const Fleet = () => import('../components/pages/fleet.vue')
const routes = [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        meta:{title:'home'},
        component:Home,
        children:[
            {
               path:'/fleet',
               meta:{title:'fleet'},
               component:Fleet
            }
        ]
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