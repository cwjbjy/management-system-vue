const mutations = {
    SET_USERNAME(state, payload) {
        state.userName = payload.data
    },
    SET_COUNT(state, payload) {
        state.count = payload.data
    },
    SET_IMAGEURL(state, payload) {
        state.imageUrl = payload.data
    },
    SET_TODO(state, payload) {
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

    }
}

export default mutations