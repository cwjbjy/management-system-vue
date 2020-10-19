const dragDiv = () => import( /* webpackChunkName: "dragDiv:drag" */ "../dragDiv")
const dragDialog = () => import( /* webpackChunkName: "dragDialog:drag" */ "../dragDialog")
const dragList = () => import( /* webpackChunkName: "dragList:drag" */ "../dragList")

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