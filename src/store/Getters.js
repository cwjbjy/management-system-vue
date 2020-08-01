const getters = {
    /*vuex实现数据持久化*/
    user_name: (state)=>{
        if(state.userName === ''){
            return localStorage.getItem("user_name");
        }
        return state.userName
    }
}

export default getters