import HttpClient from './lib/httpClient'
import enumAuth from './lib/_auth'
import {baseURL} from './lib/baseUrl'

let fetchAPI = {};

fetchAPI.login = (params) => {
    return HttpClient.post(`${baseURL}/login`, {
        data: params,
        auth: enumAuth.Level02
    })
}

export default fetchAPI