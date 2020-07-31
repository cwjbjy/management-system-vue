const state = {
    count:1,
    userName:'',//用来判断页面是否刷新
    todoList: [
        {
          title: "TypeScript",
          status: false
        },
        {
          title: "Nodejs",
          status: false
        },
        {
          title: "Nginx",
          status: false
        },
        {
          title: "uni-app",
          status: false
        },
        {
          title: "跨域解决方案",
          status: true
        },
        {
          title: "Vue性能提升",
          status: true
        }
    ],
    echartColor:"#333",
    fleetBg:"rgb(6,42,88)",
    imageUrl:"",
}
export default state