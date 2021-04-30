const getters = {
    /*vuex实现数据持久化*/
    user_name: (state) => {
        return state.userName === '' ? localStorage.getItem("user_name") : state.userName
    }
}

export default getters