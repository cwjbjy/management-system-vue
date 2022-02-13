import HttpClient from '../service/axios';

export const login = (params) => {
  return HttpClient.instance.post('/login', params);
};

export const register = (params) => {
  return HttpClient.instance.post('/register', params);
};

//获取所有用户信息
export const user = () => {
  return HttpClient.instance.get('/user');
};

//删除普通用户 /Query String Parameters拼接在URL上 通常用于get与delete
export const deleteUser = (params) => {
  return HttpClient.instance.delete('/deleteUser', { params: params });
};

//修改管理员账户信息
export const updateUser = (params) => {
  return HttpClient.instance.put('/updateUser', params);
};

//获取上传图片
export const getImage = (params) => {
  return HttpClient.instance.get('/getImage', { params: params });
};

//获取用户单条信息
export const getUser = (params) => {
  return HttpClient.instance.get('/getUser', { params: params });
};
