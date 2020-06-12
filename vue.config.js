module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: false, //eslint代码检测
  devServer: {
    open: true, //加载完自动打开浏览器
    host: '127.0.0.1',
    port: 8080,
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
  // css相关配置
  css: {
    // 是否分离css（开发时注释掉，否则修改CSS样式无法触发热更新）
    // extract: true,
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/index.scss";`
      },
      postcss: {
        plugins: []
      }
    },
    // 是否启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  configureWebpack: config => { //增加webpack配置
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production'
    } else {
      config.mode = 'development'
    }
  }
}