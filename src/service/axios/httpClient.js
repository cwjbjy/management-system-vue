import {
  Message
} from "element-ui";

var HttpClient = {};

let baseURL = process.env.VUE_APP_BASEURL;

/*
 * 创建实例
 * 与后端服务通信
 */
HttpClient.instance = axios.create({
  baseURL,
  // headers:{'Content-Type':'application/x-www-form-urlencoded'} 
});

/**
 * 创建实例获取本地json文件数据
 */
HttpClient.instance1 = axios.create({})

/**
 * 请求拦截器
 * 功能：配置请求头，全局配置报错提示
 */
HttpClient.instance.interceptors.request.use(config => {
  let token = Vue.$cookies.get('token');
  if (!config.headers) {
    config.headers = {}
  }
  config.headers['Authorization'] = 'Bearer ' + token;
  return config
}, error => {
  Message.error("网络错误，请稍后重试");
  return Promise.reject(error)
});

/**
 * 响应拦截器
 * 功能：处理异常
 */
HttpClient.instance.interceptors.response.use(config => {
  return config
}, error => {
  return Promise.reject(error)
});

export default HttpClient