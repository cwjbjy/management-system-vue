const mutations = {
    set_userName(state, payload) {
        state.userName = payload.data
    },
    set_count(state, payload) {
        state.count = payload.data
    },
    set_echartColor(state,payload){
        state.echartColor = payload.data
    },
    set_fleetBg(state,payload){
        state.fleetBg = payload.data
    }
}

export default mutations