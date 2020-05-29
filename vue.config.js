// const path = require('path')
//vue.config.js文件是vue3.0预留给我们对webpack进行自定义配置
module.exports = {
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    publicPath: './',
    assetsDir: 'static',
    devServer: {
        host:'127.0.0.1',
        port:8081,
        // proxy: {
        //     '/api':{
        //         target:'http://jsonplaceholder.typicode.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    },
    css: {
        loaderOptions: {
          sass: {
            prependData: `@import "@/assets/scss/index.scss";`
          }
        }
      }
}