const mutations = {
    set_echartColor(state, payload) {
        state.echartColor = payload.data
    },
    set_fleetBg(state, payload) {
        state.fleetBg = payload.data
    },
}

export default mutations