//获取当前时间
export function getTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  let time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  return time;
}

//深拷贝
export function deepCopy(target, map = new WeakMap()) {
  let newObj;
  if (typeof target === 'object' && target !== null) {
    newObj = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, newObj);
    for (let key in target) {
      newObj[key] = deepCopy(target[key], map);
    }
  } else {
    newObj = target;
  }
  return newObj;
}

//判断对象是否为空
export function getIsObjectEmpty(target) {
  if (Object.keys(target).length > 0) {
    return true; //不为空对象
  }
  return false; //为空对象
}

//判断字符是否为空
export function getIsStringEmpty(target) {
  if ((target ?? '') !== '') {
    return true; //返回true，为空
  }
  return false; //返回false，不为空
}
