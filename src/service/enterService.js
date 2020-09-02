/**
 * 入口服务
 * 加载 静态配置文件
*/

import LocalClient from './lib/localClinet'

//环境文件映射
let confMap = {
    "production":"pro_api.js",
    "development":"dev_api.js"
}

//配置地址映射
let urlMap = {
    api:`./config/${confMap[process.env.NODE_ENV]}`,
}

/**
 * 获取API地址
*/

export async function getGlobalRequestUrl(){
    return await LocalClient.get({
        url:urlMap.api,
        uag:'API'
    })
}