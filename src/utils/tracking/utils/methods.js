//全局唯一标识
export function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

//数据上传
export const sendBeacon = navigator.sendBeacon
  ? (url, data) => {
      if (data) navigator.sendBeacon(url, JSON.stringify(data));
    }
  : (url, data) => {
      // 传统方式传递参数
      const beacon = new Image();
      beacon.src = `${url}?v=${encodeURIComponent(JSON.stringify(data))}`;
    };

//判断浏览器类型
export function browserType() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  //判断是否Opera浏览器
  var isOpera = userAgent.indexOf('Opera') > -1;
  //判断是否IE浏览器
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera;
  //判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE;
  //判断是否Firefox浏览器
  var isFF = userAgent.indexOf('Firefox') > -1;
  //判断是否Safari浏览器
  var isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1;
  //判断Chrome浏览器
  var isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1;

  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp['$1']);
    if (fIEVersion === 7) return 'IE7';
    else if (fIEVersion === 8) return 'IE8';
    else if (fIEVersion === 9) return 'IE9';
    else if (fIEVersion === 10) return 'IE10';
    else return 'IE7以下'; //IE版本过低
  }
  if (isIE11) return 'IE11';
  if (isEdge) return 'Edge';
  if (isFF) return 'FF';
  if (isOpera) return 'Opera';
  if (isSafari) return 'Safari';
  if (isChrome) return 'Chrome';
}

const arrayMap =
  Array.prototype.map ||
  function polyfillMap(fn) {
    const result = [];
    for (let i = 0; i < this.length; i += 1) {
      result.push(fn(this[i], i, this));
    }
    return result;
  };

/**
 * map方法
 */
export function map(arr, fn) {
  return arrayMap.call(arr, fn);
}

const arrayFilter =
  Array.prototype.filter ||
  function filterPolyfill(fn) {
    const result = [];
    for (let i = 0; i < this.length; i += 1) {
      if (fn(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };

/**
 * filter方法
 */
export function filter(arr, fn) {
  return arrayFilter.call(arr, fn);
}

const arrayFind =
  Array.prototype.find ||
  function findPolyfill(fn) {
    for (let i = 0; i < this.length; i += 1) {
      if (fn(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  };

/**
 * find方法
 */
export function find(arr, fn) {
  return arrayFind.call(arr, fn);
}

//处理数据类型
export function dealType(arr) {
  const time = Date.now();
  return arr.map((e) => {
    e.sendTime = time;
    // 补充type字段,将click、scroll、change、submit事件作为一类存储
    if (e.eventType === 'click' || e.eventType === 'scroll' || e.eventType === 'submit' || e.eventType === 'change') {
      e.type = 'mix';
      return e;
    }
    if (e.eventType === 'performance') {
      // 将性能进行分类,不同类型的性能数据差异较大,分开存放,资源、页面、请求
      switch (e.eventId) {
        case 'resource':
          e.type = 'resourcePerformance';
          break;
        case 'page':
          e.type = 'pagePerformance';
          break;
        case 'server':
          e.type = 'serverPerformance';
          break;
        default:
          break;
      }
      return e;
    }
    e.type = e.eventType; // 其他类型type同eventType
    return e;
  });
}

//异步方法
export const nextTime =
  window.requestIdleCallback || window.requestAnimationFrame || ((callback) => setTimeout(callback, 17));
