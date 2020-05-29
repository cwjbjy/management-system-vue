const actions = {
    setCount({commit}, payload) {
        commit('set_count', payload.data)
    }
}

export default actions