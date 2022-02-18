const state = () => ({
  batch: {
    type: 'batch',
    list: [],
    timestamp: 0,
  },
});

const mutations = {
  //增加数据埋点数据
  ADD_BATCH(state, payload) {
    state.batch.list.push(payload.data);
    state.batch.timestamp = Date.now();
  },
  //清空批量数据
  CLEAR_BATCH(state) {
    (state.batch.list = []), (state.batch.timestamp = 0);
  },
};

export default {
  namespaced: true, //模块命名空间
  state,
  mutations,
};
