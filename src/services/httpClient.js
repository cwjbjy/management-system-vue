// import axios from 'axios'
import qs from 'qs'
import {Message} from "element-ui";

var HttpClient = {};

HttpClient.instance = axios.create({
  baseURL: "//127.0.0.1:9000/api" ,
  // baseURL: "https://wen.cwjbjy.online/api" ,
  // headers:{'Content-Type':'application/x-www-form-urlencoded'}
});

HttpClient.instance1 = axios.create({
  
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