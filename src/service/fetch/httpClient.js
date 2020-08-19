import enumAuth from './_auth'
import qs from 'qs'
import {Message} from "element-ui";

let baseURL = process.env.VUE_APP_BASEURL;

class FetchClient {
    constructor(){
        this.headers = {};
        this.config={
            cache:'no-cache',
        }
    }
    /**
     * 请求拦截器
     * 功能：请求配置，鉴权
     */
    interceptorsRequest(url,{auth,method,data}){
        let headers = null;
        let conf = {};

        //通过鉴权产出headers
        switch(auth){
            case enumAuth.Level01: //需要token
            headers = Object.assign({},this.headers,{
                Authorization:`Bearer ${Vue.$cookies.get('token')}`
            });
            break;
            case enumAuth.Level02: //前端固定token
            headers = Object.assign({},this.headers,{
                Authorization:`Basic ${process.env.VUE_APP_TOKEN}`
            });
            break;
            case enumAuth.Level03: //不需要token
            headers = Object.assign({},this.headers,{});
            break;
        }

        if( method == 'GET' || method == 'HEAD' || method == 'DELETE'){
            //fetch对GET请求等，不支持将参数传在body上，只能拼接url (axios可以)
            data = qs.stringify(data,{arrayFormat: 'brackets'});
            url = `${url}?${data}`
        }else{
            if(Object.prototype.toString.call(data) !== '[object FormData]'){
                Object.assign(headers,{'Content-Type':'application/json'})
                data = JSON.stringify(data)
            }
            conf = {body:data}
        }
        return {
            url,
            options:Object.assign({},this.config,{method,headers},conf)
        }
    }

    /**
     * 响应拦截器
     */
    interceptorsResponse(res){
        return new Promise((resolve,reject)=>{
            if(res.ok){
                try{
                    return resolve(res.json());
                }catch{
                    return resolve({status:'ok'})
                }
            }
            Message.error("网络错误，请稍后重试");
            reject()
        })
    }

    /**
     * 请求工厂
     */
    async httpFactory(url='',{data=null,auth=enumAuth.Level01,method}){
        let req = await this.interceptorsRequest(url,{data,auth,method}); //请求拦截
        let res = await fetch(req.url,req.options); //网络请求
        let rst = await this.interceptorsResponse(res);
        return rst
    }

    async get(url,params){
        return await this.httpFactory(`${baseURL}${url}`,{...params,method:'GET'})
    }
    
    async post(url,params){
        return await this.httpFactory(`${baseURL}${url}`,{...params,method:'POST'})
    }

    async put(url,params){
        return await this.httpFactory(`${baseURL}${url}`,{...params,method:'PUT'})
    }

    async delete(url,params){
        return await this.httpFactory(`${baseURL}${url}`,{...params,method:'DELETE'})
    }

    async patch(url,params){
        return await this.httpFactory(`${baseURL}${url}`,{...params,method:'PATCH'})
    }
}

export default new FetchClient()