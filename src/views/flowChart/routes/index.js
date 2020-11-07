//流程图路由模块
const positionChart = () => import( /* webpackChunkName: "positionChart" */ "../positionChart")
const commonChart = () => import( /* webpackChunkName: "commonChart" */ "../commonChart")
const foldChart = () => import( /* webpackChunkName: "foldChart" */ "../foldChart")

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