import qs from 'qs'
import {
  Message
} from "element-ui";

var HttpClient = {};

const env = process.env.NODE_ENV;
let baseURL = "";

switch (env) {
  case 'development':
    baseURL = "//127.0.0.1:9000/api"
    break;
  case 'production':
    baseURL = "https://wen.cwjbjy.online/api"
    break;
}

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
  // let regular = /^\/login$/;
  // if (regular.test(error.response.config.url)) {
  //   switch (error.response.status) {
  //     case 400:
  //       Message.error("密码错误")
  //       break;
  //     case 401:
  //       Message.error("账号错误")
  //   }
  // }else{
  //   Message.error("网络错误，请稍后重试");
  // }
  Message.error("网络错误，请稍后重试");
  return Promise.reject(error)
});

export default HttpClient