const Login = () => import(/* webpackChunkName: "Login" */'@/views/login.vue')
const Home = () => import(/* webpackChunkName: "Home" */'@/views/home.vue')
const notFound = () => import(/* webpackChunkName: "notFound" */'@/views/404.vue')

const firstItem = () => import(/* webpackChunkName: "HomePage" */'@/views/firstItem.vue')

const Fleet = () => import(/* webpackChunkName: "Fleet" */'@/views/fleetLine.vue')
const baseEcharts = () => import(/* webpackChunkName: "baseEcharts" */"@/views/baseEcharts.vue")
const baseTable = () =>import(/* webpackChunkName: "baseTable" */"@/views/baseTable")

const positionChart = () => import(/* webpackChunkName: "positionChart" */"@/views/flowChart/positionChart.vue")
const commonChart = ()=> import(/* webpackChunkName: "commonChart" */"@/views/flowChart/commonChart.vue")
const foldChart = () => import(/* webpackChunkName: "foldChart" */"@/views/flowChart/foldChart.vue")

const magnifying = () => import(/* webpackChunkName: "magnifying" */"@/views/magnifying.vue")
const fileUp = () => import(/* webpackChunkName: "fileUp" */"@/views/fileUp.vue")

const pdf = () => import(/* webpackChunkName: "pdf.vue" */"@/views/pdf.vue")
const manage = () => import(/* webpackChunkName: "manage" */"@/views/userManage.vue")

const dragDiv = () =>import(/* webpackChunkName: "dragDiv" */"@/views/drag/moveDiv")
const dragDialog = () =>import(/* webpackChunkName: "dragDialog" */"@/views/drag/dragDialog")
const dragList = () => import(/* webpackChunkName: "dragList" */"@/views/drag/dragList")

const routes = [
    {
        path:'/',
        redirect:'/firstItem'
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
                path:'/baseTable',
                meta:{title:'baseTable'},
                component:baseTable
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
                path:'/fileUp',
                meta:{title:'fileUp'},
                component:fileUp
            },
            {
                path:'/pdf',
                meta:{title:'pdf'},
                component:pdf
            },
            {
                path:'/manage',
                meta:{title:'manage'},
                component:manage
            },
            {
                path:'/dragDiv',
                meta:{title:'dragDiv'},
                component:dragDiv
            },
            {
                path:'/dragDialog',
                meta:{title:'dragDialog'},
                component:dragDialog
            },
            {
                path:'/dragList',
                meta:{title:'dragList'},
                component:dragList
            },
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