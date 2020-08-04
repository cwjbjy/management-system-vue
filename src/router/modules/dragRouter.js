const dragDiv = () => import( /* webpackChunkName: "dragDiv:drag" */ "@/views/DragComponents/DragDiv")
const dragDialog = () => import( /* webpackChunkName: "dragDialog:drag" */ "@/views/DragComponents/DragDialog")
const dragList = () => import( /* webpackChunkName: "dragList:drag" */ "@/views/DragComponents/DragList")

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