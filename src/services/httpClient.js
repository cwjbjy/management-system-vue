// import axios from 'axios'
// import qs from 'qs'
// import {Message} from "element-ui";

var HttpClient = {};

const env = process.env.NODE_ENV;
let baseURL = "";

switch(env){
  case 'development':
    baseURL="//127.0.0.1:9000/api"
    break;
  case 'production':
    baseURL = "https://wen.cwjbjy.online/api"
    break;
}

HttpClient.instance = axios.create({
  baseURL,
  // headers:{'Content-Type':'application/x-www-form-urlencoded'} 这种请求方式，后端得到的将不再是JSON而是字符串
});

HttpClient.instance1 = axios.create({
  baseURL:'http://v.juhe.cn'
})

HttpClient.instance.interceptors.request.use(config =>{
  let token = Vue.$cookies.get('token');
  if(!config.headers){
    config.headers = {}
  }
  config.headers['Authorization'] = 'Bearer ' + token
  return config
},error => {
  // Message.error("网络错误，请稍后重试");
  return Promise.reject(error)
});

HttpClient.instance.interceptors.response.use(config =>{
  return config
},error => {
  // Message.error("网络错误，请稍后重试");
  return Promise.reject(error)
});

export default HttpClient