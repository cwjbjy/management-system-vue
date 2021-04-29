const mutations = {
    SET_COLOR(state, payload) {
        state.echartColor = payload.data
    },
    SET_FLEET(state, payload) {
        state.fleetBg = payload.data
    },
    SET_THEME(state, payload) {
        state.theme = payload.data
    },
}

export default mutations