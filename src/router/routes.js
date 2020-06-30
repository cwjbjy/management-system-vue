const Home = () => import(/* webpackChunkName: "Home" */'../components/layout/home.vue')
const Login = () => import(/* webpackChunkName: "Login" */'../components/layout/login.vue')
const notFound = () => import(/* webpackChunkName: "notFound" */'../components/layout/404.vue')
const HomePage = () => import(/* webpackChunkName: "HomePage" */'../components/pages/homePage.vue')

const Fleet = () => import(/* webpackChunkName: "Fleet" */'../components/pages/echart/fleet.vue')
const baseEcharts = () => import(/* webpackChunkName: "baseEcharts" */"../components/pages/echart/baseEcharts.vue")

const positionChart = () => import(/* webpackChunkName: "positionChart" */"../components/pages/chart/positionChart.vue")
const commonChart = ()=> import(/* webpackChunkName: "commonChart" */"../components/pages/chart/commonChart.vue")
const foldChart = () => import(/* webpackChunkName: "foldChart" */"../components/pages/chart/foldChart.vue")

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