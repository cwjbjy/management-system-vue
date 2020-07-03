const Login = () => import(/* webpackChunkName: "Login" */'@/views/login.vue')
const Home = () => import(/* webpackChunkName: "Home" */'@/views/home.vue')
const notFound = () => import(/* webpackChunkName: "notFound" */'@/views/404.vue')

const firstItem = () => import(/* webpackChunkName: "HomePage" */'@/views/firstItem.vue')

const Fleet = () => import(/* webpackChunkName: "Fleet" */'@/views/fleetLine.vue')
const baseEcharts = () => import(/* webpackChunkName: "baseEcharts" */"@/views/baseEcharts.vue")

const positionChart = () => import(/* webpackChunkName: "positionChart" */"@/views/flowChart/positionChart.vue")
const commonChart = ()=> import(/* webpackChunkName: "commonChart" */"@/views/flowChart/commonChart.vue")
const foldChart = () => import(/* webpackChunkName: "foldChart" */"@/views/flowChart/foldChart.vue")

const magnifying = () => import(/* webpackChunkName: "magnifying" */"@/views/magnifying.vue")
const manage = () => import(/* webpackChunkName: "manage" */"@/views/userManage.vue")

const routes = [
    {
        path:'/',
        redirect:'/homePage'
    },
    {
        path:'/home',
        meta:{title:'home'},
        component:Home,
        redirect:'/firstItem',
        children:[
            {
                path:'/firstItem',
                meta:{title:'firstItem'},
                component:firstItem
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
            },
            {
                path:'/magnifying',
                meta:{title:'magnifying'},
                component:magnifying
            },
            {
                path:'/manage',
                meta:{title:'manage'},
                component:manage
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