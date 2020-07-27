const Login = () => import(/* webpackChunkName: "Login" */'@/views/AppLogin.vue')
const notFound = () => import(/* webpackChunkName: "notFound" */'@/views/NotFound.vue')
const Home = () => import(/* webpackChunkName: "Home" */'@/views/AppHome.vue')

const firstItem = () => import(/* webpackChunkName: "HomePage" */'@/views/HomePage.vue')

const Fleet = () => import(/* webpackChunkName: "Fleet" */'@/views/FleetLine.vue')

const baseEcharts = () => import(/* webpackChunkName: "baseEcharts" */"@/views/BaseEcharts.vue")

const baseTable = () =>import(/* webpackChunkName: "baseTable" */"@/views/BaseTable")

const positionChart = () => import(/* webpackChunkName: "positionChart" */"@/views/FlowChart/PositionChart.vue")
const commonChart = ()=> import(/* webpackChunkName: "commonChart" */"@/views/FlowChart/CommonChart.vue")
const foldChart = () => import(/* webpackChunkName: "foldChart" */"@/views/FlowChart/FoldChart.vue")

const magnifying = () => import(/* webpackChunkName: "magnifying" */"@/views/Magnifying.vue")
const fileUp = () => import(/* webpackChunkName: "fileUp" */"@/views/FileUp.vue")

const pdf = () => import(/* webpackChunkName: "pdf.vue" */"@/views/PDFPreview.vue")

const dragDiv = () =>import(/* webpackChunkName: "dragDiv" */"@/views/DragComponents/DragDiv")
const dragDialog = () =>import(/* webpackChunkName: "dragDialog" */"@/views/DragComponents/DragDialog")
const dragList = () => import(/* webpackChunkName: "dragList" */"@/views/DragComponents/DragList")

const I18n = () => import(/* webpackChunkName: "I18n.vue" */"@/views/I18n.vue")

const chatRoom = () => import(/* webpackChunkName: "chatRoom.vue" */"@/views/ChatRoom.vue")

const manage = () => import(/* webpackChunkName: "manage" */"@/views/UserManage.vue")

export const routes = [
    {
        path:'/',
        redirect:'/firstItem'
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
    }
]

export const route_admin = [
    {
        path:'/home',
        meta:{title:'home'},
        component:Home,
        redirect:'/firstItem',
        children:[
            {
                path:'/firstItem',
                meta:{title:'系统首页'},
                component:firstItem
            },
            {
               path:'/fleet',
               meta:{title:'模拟航线'},
               component:Fleet
            },
            {
                path:'/fileUp',
                meta:{title:'图片上传'},
                component:fileUp
            },
            {
                path:'/pdf',
                meta:{title:'文件预览'},
                component:pdf
            },
            {
                path:'/baseEcharts',
                meta:{title:'基础图表'},
                component:baseEcharts
            },
            {
                path:'/baseTable',
                meta:{title:'基础表格'},
                component:baseTable
            },
            {
                path:'/dragDiv',
                meta:{title:'dragDiv'},
                component:dragDiv
            },
            {
                path:'/dragDialog',
                meta:{title:'拖拽弹框'},
                component:dragDialog
            },
            {
                path:'/dragList',
                meta:{title:'拖拽列表'},
                component:dragList
            },
            {
                path:'/I18n',
                meta:{title:'语言转换'},
                component:I18n
            },
            {
                path:'/commonChart',
                meta:{title:'一般流程图'},
                component:commonChart
            },
            {
                path:'/positionChart',
                meta:{title:'定位流程图'},
                component:positionChart
            },
            {
                path:'/foldChart',
                meta:{title:'折叠流程图'},
                component:foldChart
            },
            {
                path:'/magnifying',
                meta:{title:'放大镜'},
                component:magnifying
            },
            {
                path:'/chatRoom',
                meta:{title:'聊天室'},
                component:chatRoom
            },
            {
                path:'/manage',
                meta:{title:'后台管理'},
                component:manage
            },
        ]
    },
    {
        path:'*',
        redirect:'/404'
    },
]

export const route_user = [
    {
        path:'/home',
        meta:{title:'home'},
        component:Home,
        redirect:'/firstItem',
        children:[
            {
                path:'/firstItem',
                meta:{title:'系统首页'},
                component:firstItem
            },
            {
               path:'/fleet',
               meta:{title:'模拟航线'},
               component:Fleet
            },
            {
                path:'/fileUp',
                meta:{title:'图片上传'},
                component:fileUp
            },
            {
                path:'/baseEcharts',
                meta:{title:'基础图表'},
                component:baseEcharts
            },
            {
                path:'/baseTable',
                meta:{title:'基础表格'},
                component:baseTable
            },
            {
                path:'/dragDialog',
                meta:{title:'拖拽弹框'},
                component:dragDialog
            },
            {
                path:'/dragList',
                meta:{title:'拖拽列表'},
                component:dragList
            },
            {
                path:'/I18n',
                meta:{title:'语言转换'},
                component:I18n
            },
            {
                path:'/commonChart',
                meta:{title:'一般流程图'},
                component:commonChart
            },
            {
                path:'/positionChart',
                meta:{title:'定位流程图'},
                component:positionChart
            },
            {
                path:'/foldChart',
                meta:{title:'折叠流程图'},
                component:foldChart
            },
            {
                path:'/magnifying',
                meta:{title:'放大镜'},
                component:magnifying
            },
            {
                path:'/chatRoom',
                meta:{title:'聊天室'},
                component:chatRoom
            },
        ]
    },
    {
        path:'*',
        redirect:'/404'
    },
]

