// const CompressionPlugin = require('compression-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
new HtmlWebpackPlugin({
  inject:'body'
})
module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: false, //eslint代码检测
  devServer: {
    open: true, //加载完自动打开浏览器
    host: '127.0.0.1',
    hot:true,
    port: 8083,
    // proxy: {
    //     '/juhe':{
    //         target:'http://v.juhe.cn',
    //         changeOrigin:true,
    //         pathRewrite:{
    //           "^/juhe":""
    //         }
    //     }
    // }
  },
  // css相关配置
  css: {
    extract: false,
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
  chainWebpack: config => {
    // 移除 prefetch 插件,取消预加载，启动懒加载
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
    config.plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },

  configureWebpack: {
    //externals中的key是用于import，value表示在全局中访问到该对象，就是window.echarts
    externals: {
      'echarts': 'echarts',
      'element-ui': 'ELEMENT',
      'axios':'axios',
      'vue':'Vue',
      'vuex':'Vuex',
      'vue-router':'VueRouter'
    }
  },
}