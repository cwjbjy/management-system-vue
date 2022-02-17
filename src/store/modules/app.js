const state = {
  userName: '',
  todoList: [
    {
      title: 'TypeScript',
      status: false,
    },
    {
      title: 'Nodejs',
      status: false,
    },
    {
      title: 'Nginx',
      status: false,
    },
    {
      title: 'uni-app',
      status: false,
    },
    {
      title: '跨域解决方案',
      status: true,
    },
    {
      title: 'Vue性能提升',
      status: true,
    },
  ],
  imageUrl: '',
};

const mutations = {
  SET_USERNAME(state, payload) {
    state.userName = payload.data;
  },
  SET_IMAGEURL(state, payload) {
    state.imageUrl = payload.data;
  },
  SET_TODO(state, payload) {
    switch (payload.type) {
      case 'add':
        state.todoList.unshift({
          title: payload.data,
          status: false,
        });
        break;
      case 'edit':
        state.todoList.forEach((item, index) => {
          if (payload.index === index) {
            item.title = payload.data;
          }
        });
        break;
      case 'delete':
        state.todoList.splice(payload.index, 1);
        break;
      default:
        break;
    }
  },
};

const actions = {
  setCount({ commit }, payload) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('SET_COUNT', payload);
        resolve();
      }, 1000);
    });
  },
};

const getters = {
  /*vuex实现数据持久化*/
  user_name: (state) => {
    return state.userName === '' ? localStorage.getItem('user_name') : state.userName;
  },
};

export default {
  namespaced: true, //模块命名空间
  state,
  mutations,
  actions,
  getters,
};
