import * as base from './lib/base';
import pv from './lib/pv';
import http from './lib/http-request';
import err from './lib/err';
import event from './lib/event';
import performance from './lib/performance';

const methods = {
  traceError: err.traceError,
  tracePerformance: performance.tracePerformance,
  traceCustomEvent: event.traceCustomEvent,
  tracePageView: pv.tracePageView,
};

const init = (options = {}) => {
  const _options = {
    requestUrl: '', // 请求地址
    appName: '', // 应用名称

    pv: false, // 页面跳转-是否自动发送页面跳转相关数据

    performanceCore: false, // 性能数据-是否采集静态资源、接口的相关数据
    performanceFirstResource: false, // 性能数据-是否采集首次进入页面的数据(ps: tcp连接耗时,HTML加载完成时间,首次可交互时间)
    performanceServer: false, // 接口请求-是否采集接口请求(成功的才会采集)

    errorCore: false, // 是否采集异常数据(ps: 资源引入错误,promise错误,控制台输出错误)
    errorServer: false, // 接口请求-是否采集报错接口数据

    eventCore: false, // 页面点击-是否采集点击事件
    eventUnload: false, // 页面卸载-是否在页面卸载时采集页面状态信息
  };

  // 将传过来的参数转换
  transitionOptions(_options, options);

  base.init(_options);
  event.init(_options);
  pv.init(_options);
  http.init(_options);
  err.init(_options);
  performance.init(_options);
};

const transitionOptions = (_options, options) => {
  const {
    requestUrl,
    appName,
    pv = {},
    performance, //监听首屏渲染性能
    performanceCore, //监听资源加载性能
    performanceServer, //监听接口性能
    error = {},
    event = {},
  } = options;

  if (!requestUrl) throw Error('请传入requestUrl参数');
  if (!appName) throw Error('请传入appName参数');

  _options.requestUrl = requestUrl;
  _options.appName = appName;

  if (typeof pv === 'boolean') {
    _options.pv = pv;
  }

  if (typeof performance === 'boolean') {
    _options.performanceFirstResource = performance;
  }

  if (typeof performanceCore === 'boolean') {
    _options.performanceCore = performanceCore;
  }

  if (typeof performanceServer === 'boolean') {
    _options.performanceServer = performanceServer;
  }

  if (typeof error === 'boolean') {
    _options.errorCore = _options.errorServer = error;
  }

  if (typeof event === 'boolean') {
    _options.eventCore = _options.eventUnload = event;
  }
};

const install = (Vue, options = {}) => {
  init(options);
  if (Vue.prototype) {
    Vue.prototype.$trace = { ...methods };
  }
};

export default {
  install,
  init,
  ...methods,
};
export { install, init, methods };
