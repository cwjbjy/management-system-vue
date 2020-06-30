// import axios from 'axios'
import qs from 'qs'
import {Message} from "element-ui";

var HttpClient = {};

HttpClient.instance = axios.create({
  baseURL: "https://wen.cwjbjy.online/api" ,
  // headers:{}
});

HttpClient.instance1 = axios.create({
  
})

HttpClient.instance.interceptors.request.use(config =>{
  if(config.method === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config
},error => {
  Message.error("网络错误，请稍后重试");
  return Promise.reject(error)
});

HttpClient.instance.interceptors.response.use(config =>{
  return config
},error => {
  Message.error("网络错误，请稍后重试");
  return Promise.reject(error)
});

export default HttpClient