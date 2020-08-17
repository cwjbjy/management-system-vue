import chartRouter from './modules/chartRouter'
import dragRouter from './modules/dragRouter'

const Login = () => import( /* webpackChunkName: "Login" */ '@/views/AppLogin.vue')

const notFound = () => import( /* webpackChunkName: "notFound" */ '@/views/NotFound.vue')

const AppHome = () => import( /* webpackChunkName: "AppHome" */ '@/views/AppHome.vue')

const HomePage = () => import( /* webpackChunkName: "HomePage" */ '@/views/HomePage.vue')

const FleetLine = () => import( /* webpackChunkName: "FleetLine" */ '@/views/FleetLine.vue')

const BaseEcharts = () => import( /* webpackChunkName: "BaseEcharts" */ "@/views/BaseEcharts.vue")

const BaseTable = () => import( /* webpackChunkName: "BaseTable" */ "@/views/BaseTable")

const Magnifying = () => import( /* webpackChunkName: "Magnifying" */ "@/views/Magnifying.vue")

const FileUp = () => import( /* webpackChunkName: "FileUp" */ "@/views/FileUp.vue")

const PDFPreview = () => import( /* webpackChunkName: "PDFPreview" */ "@/views/PDFPreview.vue")

const I18n = () => import( /* webpackChunkName: "I18n" */ "@/views/I18n.vue")

const ChatRoom = () => import( /* webpackChunkName: "ChatRoom" */ "@/views/ChatRoomV2.0.vue")

const UserManage = () => import( /* webpackChunkName: "UserManage" */ "@/views/UserManage.vue")

const routes = [{
        path: '/',
        redirect: '/firstItem'
    },
    {
        path: '/login',
        meta: {
            title: 'login'
        },
        component: Login
    },
    {
        path: '/404',
        meta: {
            title: '404'
        },
        component: notFound
    }
]

const route_admin = [{
        path: '/home',
        meta: {
            title: 'home'
        },
        component: AppHome,
        redirect: '/firstItem',
        children: [
            ...chartRouter,
            ...dragRouter,
            {
                path: '/firstItem',
                meta: {
                    title: '系统首页'
                },
                component: HomePage
            },
            {
                path: '/fleet',
                meta: {
                    title: '模拟航线'
                },
                component: FleetLine
            },
            {
                path: '/fileUp',
                meta: {
                    title: '图片上传'
                },
                component: FileUp
            },
            {
                path: '/pdf',
                meta: {
                    title: '文件预览'
                },
                component: PDFPreview
            },
            {
                path: '/baseEcharts',
                meta: {
                    title: '基础图表'
                },
                component: BaseEcharts
            },
            {
                path: '/baseTable',
                meta: {
                    title: '基础表格'
                },
                component: BaseTable
            },
            {
                path: '/I18n',
                meta: {
                    title: '语言转换'
                },
                component: I18n
            },
            {
                path: '/magnifying',
                meta: {
                    title: '放大镜'
                },
                component: Magnifying
            },
            {
                path: '/chatRoom',
                meta: {
                    title: '聊天室'
                },
                component: ChatRoom
            },
            {
                path: '/manage',
                meta: {
                    title: '后台管理'
                },
                component: UserManage
            },
        ]
    },
    {
        path: '*',
        redirect: '/404'
    },
]

const route_user = [{
        path: '/home',
        meta: {
            title: 'home'
        },
        component: AppHome,
        redirect: '/firstItem',
        children: [
            ...chartRouter,
            ...dragRouter,
            {
                path: '/firstItem',
                meta: {
                    title: '系统首页'
                },
                component: HomePage
            },
            {
                path: '/fleet',
                meta: {
                    title: '模拟航线'
                },
                component: FleetLine
            },
            {
                path: '/fileUp',
                meta: {
                    title: '图片上传'
                },
                component: FileUp
            },
            {
                path: '/baseEcharts',
                meta: {
                    title: '基础图表'
                },
                component: BaseEcharts
            },
            {
                path: '/baseTable',
                meta: {
                    title: '基础表格'
                },
                component: BaseTable
            },
            {
                path: '/I18n',
                meta: {
                    title: '语言转换'
                },
                component: I18n
            },
            {
                path: '/magnifying',
                meta: {
                    title: '放大镜'
                },
                component: Magnifying
            },
            {
                path: '/chatRoom',
                meta: {
                    title: '聊天室'
                },
                component: ChatRoom
            },
        ]
    },
    {
        path: '*',
        redirect: '/404'
    },
]

export {routes,route_admin,route_user}