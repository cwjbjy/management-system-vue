const DragDiv = () => import( /* webpackChunkName: "DragDiv" */ "../dragDiv")
const DragDialog = () => import( /* webpackChunkName: "DragDialog" */ "../dragDialog")
const DragList = () => import( /* webpackChunkName: "dragList" */ "../dragList")

export default [{
        path: '/dragDialog',
        meta: {
            title: '拖拽弹框'
        },
        component: DragDialog
    },
    {
        path: '/dragList',
        meta: {
            title: '拖拽列表'
        },
        component: DragList
    },
]