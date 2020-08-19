import HttpClient from './httpClient'
import enumAuth from './_auth'


let fetchAPI = {};

//获取所有用户信息
fetchAPI.user = () => {
    return HttpClient.get('/user')
}

//获取用户单条信息
fetchAPI.getUser = (params) => {
    return HttpClient.get('/getUser', {
        data: params
    })
}

//删除普通用户
fetchAPI.deleteUser = (params) => {
    return HttpClient.delete('/deleteUser', {
        data: params
    })
}

//修改管理员账户信息
fetchAPI.updateUser = (params) => {
    return HttpClient.put('/updateUser', {
        data: params
    })
}

fetchAPI.login = (params) => {
    return HttpClient.post('/login', {
        data: params,
        auth: enumAuth.Level02
    })
}

export default fetchAPI