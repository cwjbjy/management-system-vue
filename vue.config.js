var HtmlWebpackPlugin = require('html-webpack-plugin');
new HtmlWebpackPlugin({
  inject: 'body',
});
module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: true,
  devServer: {
    open: true,
    host: '127.0.0.1',
    hot: true,
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
    extract: true,
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/index.scss";`,
      },
      postcss: {
        plugins: [],
      },
    },
    // 是否启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  chainWebpack: (config) => {
    // 移除 prefetch 插件,取消预加载，启动懒加载
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },

  configureWebpack: {
    //externals中的key是用于import，value表示在全局中访问到该对象，就是window.echarts
    externals: {},
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'vendor',
        cacheGroups: {
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            chunks: 'all',
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            chunks: 'all',
          },
          'vue-router': {
            name: 'vue-router',
            test: /[\\/]node_modules[\\/]vue-router[\\/]/,
            chunks: 'all',
          },
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: 40,
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            priority: 20,
          },
        },
      },
    },
  },
};
