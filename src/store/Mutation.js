const mutations = {
    set_userName(state, payload) {
        state.userName = payload.data
    },
    set_count(state, payload) {
        state.count = payload.data
    }
}

export default mutations