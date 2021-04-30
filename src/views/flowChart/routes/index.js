//流程图路由模块
const PositionChart = () => import( /* webpackChunkName: "PositionChart" */ "../positionChart")
const CommonChart = () => import( /* webpackChunkName: "CommonChart" */ "../commonChart")
const FoldChart = () => import( /* webpackChunkName: "FoldChart" */ "../foldChart")

export default [{
        path: '/commonChart',
        meta: {
            title: '一般流程图'
        },
        component: CommonChart
    },
    {
        path: '/positionChart',
        meta: {
            title: '定位流程图'
        },
        component: PositionChart
    },
    {
        path: '/foldChart',
        meta: {
            title: '折叠流程图'
        },
        component: FoldChart
    },
]