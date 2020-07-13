const mutations = {
    set_count(state, payload) {
        state.count = payload.data
    },
    set_authMenus(state,payload){
        state.authMenus = payload.data
    }
}

export default mutations