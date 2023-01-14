export default function filters(Vue) {
  //将时间戳转为年月日
  Vue.filter('formDate', function (value) {
    let date = new Date(value * 1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let r = date.getDate();
    return year + '-' + month + '-' + r;
  });
  Vue.filter('register', (value) => {
    if (!value) return '';
    return value.substring(0, 10);
  });
}
