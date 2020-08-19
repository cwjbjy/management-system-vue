# service文档

基于axios的后端交互

# 目录结构

service
|——axios
    |——api.js (后端请求地址)
    |——httpClient.js (基础配置文件)
    |——loaclData.js (本地json数据)
|——fetch
    |——_auth.js (鉴权模块)
    |——api.js (请求接口)
    |——httpClient.js (fetch封装)
|——insService.js (WebSocket通信接口)

# 文件命名

以小写字母开头驼峰命名

# 请求方式传参

## POST
HttpClient.instance.post(URL,params)
POST传输格式：FormData

## DELETE
HttpClient.instance.delete(URL,{params:params})
DELETE传输格式：query string parameters (拼接在url上)

## PUT
HttpClient.instance.put(URL, params)
PUT传输格式：request payload (在request.body中传输一个对象，不拼接在url上)

## GET
HttpClient.instance.get(URL,{params:params})
GET传输格式：query string parameters (拼接在url上)

