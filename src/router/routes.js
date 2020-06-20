const Home = () => import('../components/layout/home.vue')
const Login = () => import('../components/layout/login.vue')
const notFound = () => import('../components/layout/404.vue')
const HomePage = () => import('../components/pages/homePage.vue')
const Fleet = () => import('../components/pages/fleet.vue')
const Earth = () => import('../components/pages/earth.vue')
const routes = [
    {
        path:'/',
        redirect:'/homePage'
    },
    {
        path:'/home',
        meta:{title:'home'},
        component:Home,
        redirect:'/homePage',
        children:[
            {
                path:'/homePage',
                meta:{title:'HomePage'},
                component:HomePage
            },
            {
               path:'/fleet',
               meta:{title:'fleet'},
               component:Fleet
            },{
                path:'/earth',
                meta:{title:'earth'},
                component:Earth
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