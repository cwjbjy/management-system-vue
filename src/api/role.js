import HttpClient from '../service/fetch';

const baseURL = process.env.VUE_APP_BASEURL;

//获取所有用户信息
export const user = () => {
  return HttpClient.get(`${baseURL}/user`);
};

//获取用户单条信息
export const getUser = (params) => {
  return HttpClient.get(`${baseURL}/getUser`, {
    data: params,
  });
};

//删除普通用户
export const deleteUser = (params) => {
  return HttpClient.delete(`${baseURL}/deleteUser`, {
    data: params,
  });
};

//修改管理员账户信息
export const updateUser = (params) => {
  return HttpClient.put(`${baseURL}/updateUser`, {
    data: params,
  });
};

export const trackUser = (data) => {
  return HttpClient.post(`${baseURL}/getVueInfo`, {
    data: data,
  });
};
