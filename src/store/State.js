const state = () => ({
  userName: '',
  todoList: [{
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
  imageUrl: "",
})
export default state