const mutations = {
    SET_COLOR(state, payload) {
        state.echartColor = payload.data
    },
    SET_FLEET(state, payload) {
        state.fleetBg = payload.data
    },
}

export default mutations