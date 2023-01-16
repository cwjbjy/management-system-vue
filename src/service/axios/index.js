import axios from 'axios';
import { Message } from 'element-ui';
import Vue from 'vue';

let HttpClient = {};

const baseURL = process.env.VUE_APP_BASEURL;

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
HttpClient.instance1 = axios.create({});

/**
 * 请求拦截器
 * 功能：配置请求头，全局配置报错提示
 */
HttpClient.instance.interceptors.request.use(
  (config) => {
    let token = Vue.$cookies.get('token');
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['authorization'] = 'Bearer ' + token;
    return config;
  },
  (error) => {
    Message.error('网络错误，请稍后重试');
    return Promise.reject(error);
  },
);

/**
 * 响应拦截器
 * 功能：处理异常
 */
HttpClient.instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          //token过期错误统一处理
          window.location.href = '/login';
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default HttpClient;
