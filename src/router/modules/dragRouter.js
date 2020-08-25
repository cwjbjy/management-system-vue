const dragDiv = () => import( /* webpackChunkName: "dragDiv:drag" */ "@/views/dragComponents/dragDiv")
const dragDialog = () => import( /* webpackChunkName: "dragDialog:drag" */ "@/views/dragComponents/dragDialog")
const dragList = () => import( /* webpackChunkName: "dragList:drag" */ "@/views/dragComponents/dragList")

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