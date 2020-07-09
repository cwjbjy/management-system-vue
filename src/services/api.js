import HttpClient from './httpClient'

var API = {};

API.login = (params) =>{
  return HttpClient.instance.post('/login',params)
}

API.register = (params) =>{
  return HttpClient.instance.post('/register',params)
}

//获取用户信息
API.user = () =>{
  return HttpClient.instance.get('/user')
}

//删除普通用户 /Query String Parameters拼接在URL上 通常用于get与delete
API.deleteUser = (params) =>{
  return HttpClient.instance.delete('/deleteUser',{params:params})
}

//修改管理员账户信息
API.updateUser = (params) =>{
  return HttpClient.instance.put('/updateUser', params)
}


export default API