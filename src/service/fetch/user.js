import HttpClient from './lib/httpClient'
import {baseURL} from './lib/baseUrl'

let fetchAPI = {};

//获取所有用户信息
fetchAPI.user = () => {
    return HttpClient.get(`${baseURL}/user`)
}

//获取用户单条信息
fetchAPI.getUser = (params) => {
    return HttpClient.get(`${baseURL}/getUser`, {
        data: params
    })
}

//删除普通用户
fetchAPI.deleteUser = (params) => {
    return HttpClient.delete(`${baseURL}/deleteUser`, {
        data: params
    })
}

//修改管理员账户信息
fetchAPI.updateUser = (params) => {
    return HttpClient.put(`${baseURL}/updateUser`, {
        data: params
    })
}


export default fetchAPI