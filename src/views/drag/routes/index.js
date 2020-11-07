const dragDiv = () => import( /* webpackChunkName: "dragDiv" */ "../dragDiv")
const dragDialog = () => import( /* webpackChunkName: "dragDialog" */ "../dragDialog")
const dragList = () => import( /* webpackChunkName: "dragList" */ "../dragList")

export default [{
        path: '/dragDialog',
        meta: {
            title: '拖拽弹框'
        },
        component: dragDialog
    },
    {
        path: '/dragList',
        meta: {
            title: '拖拽列表'
        },
        component: dragList
    },
]