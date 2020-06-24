const Home = () => import('../components/layout/home.vue')
const Login = () => import('../components/layout/login.vue')
const notFound = () => import('../components/layout/404.vue')
const HomePage = () => import('../components/pages/homePage.vue')

const Fleet = () => import('../components/pages/echart/fleet.vue')
const baseEcharts = () => import("../components/pages/echart/baseEcharts.vue")

const positionChart = () => import("../components/pages/chart/positionChart.vue")
const commonChart = ()=> import("../components/pages/chart/commonChart.vue")
const foldChart = () => import("../components/pages/chart/foldChart.vue")

// const Earth = () => import('../components/pages/earth.vue')

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
            },
            {
                path:'/commonChart',
                meta:{title:'commonChart'},
                component:commonChart
            },
            {
                path:'/positionChart',
                meta:{title:'positionChart'},
                component:positionChart
            },
            {
                path:'/foldChart',
                meta:{title:'foldChart'},
                component:foldChart
            },
            {
                path:'/baseEcharts',
                meta:{title:'baseEcharts'},
                component:baseEcharts
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