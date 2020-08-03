//流程图路由模块
const positionChart = () => import( /* webpackChunkName: "positionChart" */ "@/views/FlowChart/PositionChart.vue")
const commonChart = () => import( /* webpackChunkName: "commonChart" */ "@/views/FlowChart/CommonChart.vue")
const foldChart = () => import( /* webpackChunkName: "foldChart" */ "@/views/FlowChart/FoldChart.vue")

export default [{
        path: '/commonChart',
        meta: {
            title: '一般流程图'
        },
        component: commonChart
    },
    {
        path: '/positionChart',
        meta: {
            title: '定位流程图'
        },
        component: positionChart
    },
    {
        path: '/foldChart',
        meta: {
            title: '折叠流程图'
        },
        component: foldChart
    },
]