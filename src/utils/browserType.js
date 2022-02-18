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
