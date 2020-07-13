const mutations = {
    set_count(state, payload) {
        state.count = payload.data
    },
    set_user_name(state,payload){
        state.user_name = payload.data
    }
}

export default mutations