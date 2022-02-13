const state = () => ({
  echartColor: '#333',
  fleetBg: 'rgb(6,42,88)',
  theme: 'gray',
});

const mutations = {
  SET_COLOR(state, payload) {
    state.echartColor = payload.data;
  },
  SET_FLEET(state, payload) {
    state.fleetBg = payload.data;
  },
  SET_THEME(state, payload) {
    state.theme = payload.data;
  },
};

export default {
  namespaced: true, //模块命名空间
  state,
  mutations,
};
