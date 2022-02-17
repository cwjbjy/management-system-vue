// const DragDiv = () => import(/* webpackChunkName: "DragDiv" */ '@/views/drag/dragDiv');
const DragDialog = () => import(/* webpackChunkName: "DragDialog" */ '@/views/drag/dragDialog');
const DragList = () => import(/* webpackChunkName: "dragList" */ '@/views/drag/dragList');

export default [
  {
    path: '/dragDialog',
    meta: {
      title: '拖拽弹框',
    },
    component: DragDialog,
  },
  {
    path: '/dragList',
    meta: {
      title: '拖拽列表',
    },
    component: DragList,
  },
];
