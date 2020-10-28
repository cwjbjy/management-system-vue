const mutations = {
    set_userName(state, payload) {
        state.userName = payload.data
    },
    set_count(state, payload) {
        state.count = payload.data
    },
    set_imageUrl(state, payload) {
        state.imageUrl = payload.data
    },
    set_todoList(state, payload) {
        switch (payload.type) {
            case "add":
                state.todoList.unshift({
                    title: payload.data,
                    status: false
                })
                break;
            case "edit":
                state.todoList.forEach((item, index) => {
                    if (payload.index === index) {
                        item.title = payload.data
                    }
                })
                break;
            case "delete":
                state.todoList.splice(payload.index,1)
            default:
                break;
        }

    },
    SET_STARS(state,data){
        state.stars = data
    }
}

export default mutations